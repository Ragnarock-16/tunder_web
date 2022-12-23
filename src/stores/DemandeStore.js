import {makeAutoObservable} from "mobx";
import {api} from "../services/API";
import {toasterStore} from "./ToasterStore";

class DemandeStore{
    _isLoading = false;
    _demandes = []
    _cours = []
    _tutors = []
    constructor() {
        makeAutoObservable(this);
    }
    set isLoading(value) {
        this._isLoading = value;
    }
    get isLoading(){
        return this._isLoading;
    }
    set demandes(value) {
        this._demandes = value;
    }
    get demandes() {
        return this._demandes;
    }
    set cours(value) {
        this._cours = value;
    }
    get cours() {
        return this._cours;
    }
    set tutors(value) {
        this._tutors = value;
    }
    get tutors() {
        return this._tutors;
    }

    getDemandes(){
       api.getDemande(localStorage.getItem('token')).then(response => {
           if(response.status){
               console.log("Erreur lors de la récupération des demandes")
           }else{
               let sortedData = this.sortDemandesByDate(response)
               this.demandes = this.tableFormat(sortedData)
           }
       })
    }
    sortDemandesByDate(data){
        return data.sort((a,b) => Date.parse(b.rencontre.date)-Date.parse(a.rencontre.date))
    }
    getCours(){
        api.getCours().then(response => {
            if(response.status){
                console.log("Erreur lors de la récupération des cours")
            }else{
                this.cours = response
            }
        })
    }
    getTutors(bloc,cours){
        return api.getTutors(localStorage.getItem('token'),bloc,cours).then(response => {
            if(response.status){
                console.log("Erreur lors de la récupération des tuteurs")
            }else{
                this.tutors =response
            }
        })
    }
    getCoursGivenBloc(bloc){
        return this.inputCoursFormat(this.cours.filter(cours => cours.bloc === bloc))
    }
    getTutorGivenCours(){
        return this.inputTutorFormat(this.tutors)
    }

    inputTutorFormat(data){
        let formattedData=[]
        data.forEach(tutor => {
            formattedData.push({
                label: tutor.email,
            })
        })
        return formattedData
    }
    inputCoursFormat(data){
       let formattedData=[]
        data.forEach(cours => {
            formattedData.push({
                label: cours.nom,
                bloc : cours.bloc
            })
        })
        return formattedData
    }
    tableFormat(data){
        let formattedData = []
        data.forEach(demande => {
            formattedData.push({
                id: demande.id,
                Bloc: demande.cours.bloc,
                Cours: demande.cours.nom,
                Tuteur: demande.gestionnaire,
                Demandeur: demande.demandeur,
                Commentaire: demande.commentaire,
                Date: demande.rencontre.date==="1970-01-01 01:00"?"/":demande.rencontre.date,
                Lieu: demande.rencontre.addresse===""?"/":demande.rencontre.addresse,
                Etat: demande.etat,
            })
        })
        return formattedData
    }
    addDemande(demande){
        this.isLoading = true
        let data = {
            id: 0,
            commentaire: demande.get("message"),
            etat: "waiting",
            gestionnaire: demande.get("tuteur"),
            demandeur: "",
            cours: {
                bloc: demande.get("bloc"),
                nom: demande.get("cours")
            },
            rencontre: {
                date: demande.get("dateTime")===""? "1970-01-01 01:00":demande.get("dateTime"),
                addresse: demande.get("rue") +" " +demande.get("num")
            }
        }
        api.addDemande(localStorage.getItem('token'),data).then(response => {
            if(response===200){
                this.getDemandes()
                toasterStore.displayConfirmMessage("Demande créée avec succès")
            }else{
                toasterStore.displayErrorMessage("Erreur lors de la création de la demande")
            }
            this.isLoading = false
        })
    }
    beTutor(demande){
        let data = []
        demande.forEach(demande => {
            data.push({
                bloc: demande.bloc,
                nom: demande.label,
            })
        })
        api.becomeTutor(localStorage.getItem('token'),data).then(response => {
            if(response===200){
                toasterStore.displayConfirmMessage("Demande de tuteur créée avec succès")
            }else{
                toasterStore.displayErrorMessage("Erreur lors de la création de la demande de tuteur")
            }
        })
    }
    updateDemande(demande,etat){
        let data = {
            id: demande.id,
            commentaire: demande.Commentaire,
            etat: etat,
            gestionnaire: demande.Tuteur,
            demandeur:demande.Demandeur,
            cours: {
                bloc: demande.Bloc,
                nom: demande.Cours
            },
            rencontre: {
                date: demande.Date,
                addresse: demande.Lieu
            }
        }
        api.updateDemande(localStorage.getItem('token'),data).then(response => {
            if(response===200){
                this.getDemandes()
                toasterStore.displayConfirmMessage("Statut de la demande modifié avec succès")
            }else{
                toasterStore.displayErrorMessage("Erreur lors de l'acceptation de la demande")
            }
        })
    }
}
export const demandeStore = new DemandeStore();
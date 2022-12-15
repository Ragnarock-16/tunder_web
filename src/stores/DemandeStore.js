import {makeAutoObservable} from "mobx";
import {api} from "../services/API";
import {toasterStore} from "./ToasterStore";

class DemandeStore{
    _demandes = []
    _cours = []
    _tutors = []
    constructor() {
        makeAutoObservable(this);
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
               this.demandes = this.tableFormat(response)
           }
       })
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
                label: cours.nom
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
                addresse: demande.get("rue") + demande.get("num")
            }
        }
        api.addDemande(localStorage.getItem('token'),data).then(response => {
            if(response===200){
                this.getDemandes()
                toasterStore.displayConfirmMessage("Demande créée avec succès")
            }else{
                console.log(response)
                toasterStore.displayErrorMessage("Erreur lors de la création de la demande")
            }
        })
    }
}
export const demandeStore = new DemandeStore();
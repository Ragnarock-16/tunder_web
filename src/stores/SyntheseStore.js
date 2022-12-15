import {makeAutoObservable} from "mobx";
import {api} from "../services/API";
import {toasterStore} from "./ToasterStore";


class SyntheseStore{
    _syntheses = []
    _syntheseCount = undefined
    constructor(){
        makeAutoObservable(this)
    }
    set syntheseCount(value) {
        this._syntheseCount = value;
    }
    get syntheseCount(){
        return this._syntheseCount
    }
    set syntheses(syntheses){
        this._syntheses = syntheses
    }
    get syntheses(){
        return this._syntheses
    }
    getSyntheseCount(){
        api.getSyntheseCount().then(response => {
            if(!response.status) {
                this.syntheseCount = response
            }
        })
    }

    getAllSyntheses(){
        api.getSynthese(localStorage.getItem('token')).then(response => {
            if(response.status){
                toasterStore.displayErrorMessage("Erreur lors de la récupération des synthèses")
            }else{
                this.syntheses=this.formatData(response)
            }
        })
    }
    formatData(data){
        let formattedData = []
        data.forEach(synthese => {
            formattedData.push({
                id: synthese.id,
                Bloc: synthese.cours.bloc,
                Cours: synthese.cours.nom,
                Date: synthese.creationDate,
                Auteur: synthese.auteur,
                File_Name: synthese.fileName
            })
        })
        return formattedData
    }

}
export const syntheseStore = new SyntheseStore()
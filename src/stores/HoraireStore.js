import {makeAutoObservable} from "mobx";
import {api} from "../services/API";
import {userStore} from "./UserStore";
import {toasterStore} from "./ToasterStore";

class HoraireStore{

    _horaires = undefined

    constructor(){
        makeAutoObservable(this)
    }
    get horaires(){
        return this._horaires
    }
    set horaires(horaires){
        this._horaires = horaires
    }

    getHoraire(){
        api.getHoraireLink(userStore.getUserToken()).then(response => {
            if(!response.status){
                this.horaires = response
            }
        })
    }

    updateHoraire(link){
        const linkRegex = "^https://horairix.helmo.be/Services/SynchronisationAgenda\?.*"
        if(link.trim() === ''|| !link.match(linkRegex)){
            toasterStore.displayErrorMessage("Lien incorrect");
            return
        }
        api.setHoraireLink(userStore.getUserToken(),link).then(response => {
            if(response === 200){
                this.getHoraire()
                toasterStore.displayConfirmMessage("Lien horaire ajouté !")
            }else{
                toasterStore.displayErrorMessage("Erreur lors de l'ajout du lien");
            }
        })
    }
}export const horaireStore = new HoraireStore();
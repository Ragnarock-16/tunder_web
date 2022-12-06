import {makeAutoObservable} from "mobx";
import {api} from "../services/API";
import {toasterStore} from "./ToasterStore";

class ChatStore{
    _allCours = []

    constructor(){
        makeAutoObservable(this)
    }
    set allCours(value) {
        this._allCours = value;
    }
    get allCours() {
        return this._allCours;
    }

      getAllCours(){
            api.getAllCours().then(response => {
             if (response.status) {
                 toasterStore.displayErrorMessage("Erreur lors de la récupération des cours")
             } else {
                this.allCours = response
             }
         })
    }

}export const chatStore = new ChatStore();
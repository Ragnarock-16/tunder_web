import {makeAutoObservable} from "mobx";
import Utilisateur from "../models/Utilisateur";
import {api} from "../services/API";
import jwt_decode from "jwt-decode";

class UserStore{
    _utilisateur

    constructor() {
        makeAutoObservable(this);

    }
    get utilisateur(){
        return this._utilisateur
    }
    set utilisateur(token){
        if(token !== undefined){
            const decodedToken = jwt_decode(token.tokenString)
            this._utilisateur = new Utilisateur(decodedToken.username, decodedToken.email, token.tokenString)
            this.saveToStorage()
        }
    }

    getConnectedUtilisateur(){
        const token = localStorage.getItem('token')
        if(token!= undefined){
            const decodedToken = jwt_decode(token)
            this._utilisateur = new Utilisateur(decodedToken.username, decodedToken.email, token)
        }
    }
    saveToStorage(){
        const token = JSON.stringify(this._utilisateur.token)
        localStorage.setItem('token', token)
    }
    forgetUtilisateur(){
        this._utilisateur = undefined
        localStorage.removeItem('token')
        window.location.reload()
    }
}
export const userStore = new UserStore();
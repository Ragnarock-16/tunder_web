import {makeAutoObservable} from "mobx";
import jwt_decode from "jwt-decode";
import {api} from "../services/API";

class UserStore{
    _userCount = undefined
    constructor() {
        makeAutoObservable(this);
    }
    set userCount(value) {
        this._userCount = value;
    }
    get userCount() {
        return this._userCount;
    }
    getUserCount(){
        api.getUserCount().then(response => {
            if(!response.status){
                this.userCount = response
            }
        })
    }
    saveUser(token) {
        if (token !== undefined) {
            localStorage.setItem('token', token.tokenString)
        }
    }
    getUserToken(){
        return localStorage.getItem('token')
    }

    getUserEmail(){
        return jwt_decode(localStorage.getItem('token')).Email
    }
    getUserName(){
        return jwt_decode(localStorage.getItem('token')).Name
    }
    getUserRole(){
        return jwt_decode(localStorage.getItem('token')).Roles
    }
    getUserExp(){

        return jwt_decode(localStorage.getItem('token')).exp

    }
    forgetUtilisateur(){
        localStorage.removeItem('token')
        window.location.reload()
    }
}
export const userStore = new UserStore();
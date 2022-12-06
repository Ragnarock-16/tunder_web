import { makeAutoObservable } from "mobx";

class ToasterStore{
    _open = false
    _message = undefined
    _severity = undefined
    constructor() {
        makeAutoObservable(this);
    }

    get open(){
        return this._open
    }
    set open(value){
        this._open = value
    }
    get message(){
        return this._message
    }
    set message(value){
        this._message = value
    }
    get severity(){
        return this._severity
    }
    set severity(value){
        this._severity = value
    }

    displayErrorMessage(message){
        this.open = true
        this.message = message
        this.severity = 'error'
        this._setTimer()
    }
    displayConfirmMessage(message){
        this.open = true
        this._message = message
        this.severity = 'success'
        this._setTimer()
    }

    _setTimer(){
        setTimeout(() => {
            this.open = false
        }, 4000);
    }

}
export const toasterStore = new ToasterStore();
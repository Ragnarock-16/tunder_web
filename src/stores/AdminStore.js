import {makeAutoObservable} from "mobx";
import {api} from "../services/API";
import {toasterStore} from "./ToasterStore";
import {userStore} from "./UserStore";

class AdminStore{
    _users = []
    constructor() {
        makeAutoObservable(this)
    }
    set users(value) {
        this._users = value;
    }
    get users() {
        return this._users;
    }

    getAllUsers(){
        api.getUsers(userStore.getUserToken()).then(data =>
        {
            if(data.status){
                toasterStore.displayErrorMessage("Erreur lors de la récupération des utilisateurs "+data.message)
            }else{
                this.users = data
            }
        }
            )
    }
    deleteUser(user){
        if(user!==undefined){
            api.deleteUser(userStore.getUserToken(), user).then(data =>{
                if(data === 200){
                    this.getAllUsers()
                    toasterStore.displayConfirmMessage("Utilisateur supprimé")
                }else{
                    toasterStore.displayErrorMessage("Erreur lors de la suppression de l'utilisateur")
                }
            })
        }
    }
    updateUser(user,emailUpdate,usernameUpdate){
        const EmailRegex = new RegExp("^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+.[a-zA-Z]{2,6}$")
        if(user!==undefined && Boolean(emailUpdate) && Boolean(usernameUpdate)){
            if(emailUpdate.match(EmailRegex)){
                api.updateUser(userStore.getUserToken(), user, emailUpdate, usernameUpdate).then(data =>{
                    if(data === 200){
                        this.getAllUsers()
                        toasterStore.displayConfirmMessage("Utilisateur modifié")
                    }else{
                        toasterStore.displayErrorMessage("Erreur lors de la modification de l'utilisateur")
                    }
                })
            }else{
                toasterStore.displayErrorMessage("Email invalide")
            }
        }
    }
    blockUser(user){
        if(user!==undefined){
            api.blockUser(userStore.getUserToken(), user).then(data =>{
                if(data === 200){
                    toasterStore.displayConfirmMessage("Utilisateur bloqué")
                    api.getUserStatus(userStore.getUserToken(), user).then(data =>{
                        if(!data.status){
                            toasterStore.displayConfirmMessage(`Utilisateur ${data}`)
                        }
                    })
                }else{
                    toasterStore.displayErrorMessage("Erreur lors du blocage de l'utilisateur")
                }
            })
        }
    }
    async addUser(firstname,lastname,username,email,ConfirmEmail,password,confirmPassword){
        const EmailRegex = new RegExp("^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+.[a-zA-Z]{2,6}$")
        if(Boolean(email) && Boolean(username) && Boolean(password)){
            if(!email.match(EmailRegex)||email===''){
                toasterStore.displayErrorMessage("Email invalide")
                return
            }
            if(email !== ConfirmEmail){
                toasterStore.displayErrorMessage("Email ne correspond pas")
                return
            }
            if(password === ''){
                toasterStore.displayErrorMessage("Mot de passe invalide")
                return
            }
            if(password !== confirmPassword){
                toasterStore.displayErrorMessage("Mot de passe ne correspond pas")
                return
            }
            const user = {'nom':lastname,'prenom':firstname,'email':email,'username':username,'password':password}
            await api.signUp(user).then(data => {
                if(data === 200){
                    this.getAllUsers()
                    toasterStore.displayConfirmMessage("Compte créé avec succès")
                }else{
                    toasterStore.displayErrorMessage("Erreur:"+ data[0].description)
                }
            })
        }
    }
}
export const adminStore= new AdminStore()
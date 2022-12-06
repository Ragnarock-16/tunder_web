import { makeAutoObservable } from "mobx";
import {api} from "../services/API";
import jwt_decode from "jwt-decode";
import {toasterStore} from "./ToasterStore";
import {userStore} from "./UserStore";

class AuthentificationStore{

    _isLogIn = false
    _SignUpMode = false

    constructor() {
        makeAutoObservable(this);
    }
    get signUpMode(){
        return this._SignUpMode
    }
    set signUpMode(value){
        this._SignUpMode = value
    }
    get isLogIn(){
        return this._isLogIn
    }
    set isLogIn(value){
        this._isLogIn = value
    }
    isAuthenticated() {
        var token = localStorage.getItem('token')
        if(token == null || jwt_decode(token).exp < Date.now() / 1000){
            return false
        }
        return true
    }
    /**
     * Permet de se connecter avec un compte Google
     * @param response token reponse de google
     */
    handleCallbackResponse=(response)=>{
        const googleJWT = jwt_decode(response.credential);
        const tokenRequest = {'username':'','email': googleJWT.email, 'password': ''};
        api.oauthSignIn(tokenRequest).then(data => {
            if(data.status===400){
                this.handleSignUpProvider(response)
            } else{
                console.log("connexion avec google réussie")
                this.isLogIn= true
                userStore.saveUser(data)
            }
        })
    }

    /**
     * Permet de se connecter avec un compte classique
     * @param data les données de connexion (email et password)
     */
    handleSubmitLogIn(data) {
        const email = data[0]
        const psw = data[1]
        const EmailRegex = new RegExp("^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+.[a-zA-Z]{2,6}$");

        if(!data[0].match(EmailRegex)||data[0]===''){
            toasterStore.displayErrorMessage("Email invalide")
            return
        }
        if(email===''){
            toasterStore.displayErrorMessage("Mot de passe invalide")
            return
        }

        api.signIn(email,psw).then(data => {
            if(data.status){
                toasterStore.displayErrorMessage("Credential invalide ou compte inexistant")
            }else{
                console.log("Connexion réussie")
                this.isLogIn= true
                userStore.saveUser(data)
            }
        })
    }

    /**
     * Permet de s'inscrire avec un compte google. Une fois inscrit, on est automatiquement connecté
     * Le random password est généré pour empecher les utilisateurs de se connecter avec juste un email.
     * @param firstname le prénom de l'utilisateur
     * @param lastname le nom de l'utilisateur
     * @param username le username
     * @param email l'email de l'utilisateur
     */
    handleSignUpProvider(response) {
        const googleJWT = jwt_decode(response.credential);
        const randomPassword = Math.random().toString(36).slice(-8);
        const username = googleJWT.name.replace(/\s/g, '');
        const user = {'nom':googleJWT.family_name,'prenom':googleJWT.given_name,'email':googleJWT.email,'username':username,'password':randomPassword}
        api.signUp(user).then(data => {
            if(data === 200){
                console.log("Compte créé avec succès")
                this.handleCallbackResponse(response)
            }else{
                toasterStore.displayErrorMessage("Erreur:"+ data[0].description)
            }
        })
    }

    /**
     * Permet de s'inscrire avec un compte classique. Une fois inscrit, on est automatiquement connecté
     * @param firstname le prénom de l'utilisateur
     * @param lastname le nom de l'utilisateur
     * @param username le username
     * @param email l'email de l'utilisateur
     * @param ConfirmEmail la confirmation de l'email
     * @param password le mot de passe
     * @param confirmPassword la confirmation du mot de passe
     */
    handleSignUp(firstname,lastname,username,email,ConfirmEmail,password,confirmPassword) {
        const EmailRegex = new RegExp("^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+.[a-zA-Z]{2,6}$");
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
        api.signUp(user).then(data => {
            if(data === 200){
                toasterStore.displayConfirmMessage("Compte créé avec succès")
                this.handleSubmitLogIn([email,password])
            }else{
                toasterStore.displayErrorMessage("Erreur:"+ data[0].description)
            }
        })
    }
}

export const authentificationStore = new AuthentificationStore();
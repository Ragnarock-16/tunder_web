import LoginForm from "../organism/LoginForm";
import config from "../../config.json";
import {authentificationStore} from "../../stores/AuthentificationStore";
import GoogleAuth from "../molecule/GoogleAuth";
import {observer} from "mobx-react";


function Login(){
    const createAccount = () => {
        authentificationStore.signUpMode=true;
    }
    const submit = (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        authentificationStore.handleSubmitLogIn([...data.values()]);
    }

    return <div className={"loginForm"}>
        <LoginForm label={"Connexion"} handleSubmit={submit}/>
        <p className={"create"} onClick={createAccount}>Créer un compte</p>
        <hr/>
        <GoogleAuth clientId={config.GoogleClientId} callbackResponse={authentificationStore.handleCallbackResponse}/>
  </div>

}
export const ObserverLogin = observer(Login);

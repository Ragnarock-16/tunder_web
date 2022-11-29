import LoginForm from "../organism/LoginForm";
import config from "../../config.json";
import {authentificationStore} from "../../stores/AuthentificationStore";
import GoogleAuth from "../molecule/GoogleAuth";
import {observer} from "mobx-react";


function Login(){

    const submit = (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        authentificationStore.handleSubmitLogIn([...data.values()]);
    }

    return <div className={"loginForm"}>
        <LoginForm label={"Connexion"} handleSubmit={submit}/>
        <hr/>
        <GoogleAuth clientId={config.GoogleClientId} callbackResponse={authentificationStore.handleCallbackResponse}/>
  </div>

}
export const ObserverLogin = observer(Login);

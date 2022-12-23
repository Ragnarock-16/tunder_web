import {ObserverSignUpForm} from "../organism/SignUpForm";
import {observer} from "mobx-react";
import {authentificationStore} from "../../stores/AuthentificationStore";

function SignUp(){

    const submit = (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        authentificationStore.handleSignUp(...data.values());
    }

    return <div className={"loginForm"}>
        <ObserverSignUpForm handleSubmit={submit}/>
    </div>
}
export const ObserverSignUp = observer(SignUp);
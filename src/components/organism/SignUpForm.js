import InputTextField from "../molecule/InputTextField";

export default function SignUpForm({handleSubmit}) {

    return <form onSubmit={handleSubmit}>
        <h1>Inscription</h1>
        <InputTextField id={"firstname"} label={"Prenom"}/>
        <InputTextField id={"lastname"} label={"Nom"}/>
        <InputTextField id={"username"} label={"Nom d'utilisateur"}/>
        <InputTextField type={"email"}  id={"email"} label={"Email"}/>
        <InputTextField type={"email"} id={"Confirme email"} label={"Confirme email"}/>
        <InputTextField type={"password"} id={"password"} label={"Mot de passe"}/>
        <InputTextField type={"password"} id={"confirm password"} label={"Confirme Mot de passe"}/>
        <input
            className={'submit'}
            type="submit"
            value={"Inscription"}
        >
        </input>
    </form>
}
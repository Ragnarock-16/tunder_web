import InputTextField from "../molecule/InputTextField";

export default function LoginForm({label, handleSubmit}) {
    return <form onSubmit={handleSubmit}>
            <h1>{label}</h1>
            <InputTextField type={"email"} id={"email"} label={"Email"}/>
            <InputTextField type={"password"} id={"password"} label={"Mot de passe"}/>
            <input
                className={'submit'}
                type="submit"
                value={"Connexion"}
            >
            </input>
        </form>
}

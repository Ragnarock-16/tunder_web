import InputTextField from "../molecule/InputTextField";

export default function HoraireForm({handleSubmit}){
    return <div className={"horaireForm"}>
        <h1>Horaire</h1>
        <form onSubmit={handleSubmit}>
            <InputTextField type={"text"} id={"horaire"} label={"Lien Horaire"}/>
            <input
                className={'submit'}
                type="submit"
                value={"Envoyer"}
            >
            </input>
        </form>
    </div>
}
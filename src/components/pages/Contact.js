import ButtonAppBar from "../organism/Navbar";
import Box from "@mui/material/Box";
import InputTextField from "../molecule/InputTextField";
import InputMessageFiled from "../molecule/InputMessageField";
import {ObservedMessageDisplayer} from "../molecule/MessageDisplayer";
import {api} from "../../services/API";
import {toasterStore} from "../../stores/ToasterStore";
import {observer} from "mobx-react";

function Contact(){


    const handleSubmit = (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        const emailRegex = /^[a-zA-Z0-9]+(?:\.[a-zA-Z0-9]+)*@[a-zA-Z0-9]+(?:\.[a-zA-Z0-9]+)*$/
        if(data.get('Nom') === "" || data.get('Prenom') === "" || data.get('email') === "" || data.get('message') === ''){
            toasterStore.displayErrorMessage("Veuillez entrer entrer des données valide");
        }else if(!data.get('email').match(emailRegex)){
            toasterStore.displayErrorMessage("Veuillez entrer une adresse email valide");
        }else{
            api.contact(data.get('email'),data.get('message')).
            then(response => {response === 200 ?
                toasterStore.displayConfirmMessage("Votre message a bien été envoyé")
                : toasterStore.displayErrorMessage("Erreur lors de l'envoi du message");console.log(response)})
        }
    }

    return(
        <div>
            <ButtonAppBar/>

            <div className={"contact"}>
                <div className={"contact-from-title"}>
                    <h1>Contact</h1>
                </div>
                <div>
                    <Box component='form' onSubmit={handleSubmit}>
                        <div className={"contactInput"}>
                            <InputTextField className={"contactInput"} id={'Nom'} label={'Nom'} value={undefined} />
                        </div>
                        <div className={"contactInput"}>
                            <InputTextField className={"contactInput"} id={'Prenom'} label={'Prenom'} value={undefined}/>
                        </div>
                        <div className={"contactInput"}>
                            <InputTextField className={"contactInput"} id={'email'} label={'Email'} value={undefined}/>
                        </div>
                        <InputMessageFiled id={'message'} label={'Message'} value={undefined}/>
                        <input type={"submit"} className={"input-validation"} value={'Envoyer'}/>
                    </Box>
                    <ObservedMessageDisplayer message={toasterStore.message} open={toasterStore.open} severity={toasterStore.severity}/>
                </div>
            </div>
        </div>
    )
}
export const ObserverContact = observer (Contact);

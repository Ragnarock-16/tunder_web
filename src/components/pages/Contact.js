import ButtonAppBar from "../organism/Navbar";
import Box from "@mui/material/Box";
import InputTextField from "../molecule/InputTextField";
import InputMessageFiled from "../molecule/InputMessageField";
import {ObservedMessageDisplayer} from "../molecule/MessageDisplayer";
import {useState} from "react";
import {userStore} from "../../stores/UserStore";

function Contact(){
    const [open, setOpen] = useState(false);
    const [message, setMessage] = useState("");
    const [severity, setSeverity] = useState("success");

    const handleSubmit = (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        const emailRegex = /^[a-zA-Z0-9]+(?:\.[a-zA-Z0-9]+)*@[a-zA-Z0-9]+(?:\.[a-zA-Z0-9]+)*$/

        if(data.get('Nom') === "" || data.get('Prenom') === "" || data.get('email') === "" || data.get('message') === ''){
            setOpen(true);
            setMessage("Veuillez entrer entrer des données valide");
            setSeverity("error");
        }else if(!data.get('email').match(emailRegex)){
            setOpen(true);
            setMessage("Veuillez entrer une adresse email valide");
            setSeverity("error");
        }else{
            //TODO call api send and scnackbar ok.
            setOpen(true);
            setMessage("Votre demande a bien été envoyé");
            setSeverity("success");

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
                        <InputTextField id={'Nom'} label={'Nom'} value={undefined} />
                        <InputTextField id={'Prenom'} label={'Prenom'} value={undefined}/>
                        <InputTextField id={'email'} label={'Email'} value={undefined}/>
                        <InputMessageFiled id={'message'} label={'Message'} value={undefined}/>
                        <input type={"submit"} className={"input-validation"} value={'Envoyer'}/>
                    </Box>
                    <ObservedMessageDisplayer open={open} message={message} severity={severity}/>
                </div>
            </div>
        </div>
    )
}
export default Contact;

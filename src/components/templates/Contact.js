import ButtonAppBar from "../organism/Navbar";
import Box from "@mui/material/Box";
import {TextField} from "@mui/material";
import InputTextField from "../molecule/inputTextField";
import ErrorSnackbar from "../molecule/ErrorSnackbar";
import {useState} from "react";

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
                        <TextField
                            id="message"
                            name={"message"}
                            label="Message"
                            multiline
                            rows={4}
                            variant="filled"
                            sx={{width: '60%', margin: '2%'}}
                        />
                        <input type={"submit"} className={"input-validation"} value={'Envoyer'}/>
                    </Box>
                    <ErrorSnackbar open={open} message={message} severity={severity}/>
                </div>
            </div>
        </div>
    )
}
export default Contact;

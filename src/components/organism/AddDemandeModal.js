import {useState} from "react";
import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";
import {Dialog, DialogContent} from "@mui/material";
import {observer} from "mobx-react";
import {ObserverAddDemandeForm} from "../molecule/AddDemandeForm";
import {demandeStore} from "../../stores/DemandeStore";
import {toasterStore} from "../../stores/ToasterStore";

function AddDemandeModal(){
    const [open, setOpen] = useState(false);
    const handleClick = () => {
        setOpen(true);
    }
    const handleClose = () => {
        setOpen(false);
    }

    const addDemande=(event)=>{
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        const addresseRgx = new RegExp("^(\\d)+(\\w)?$");
        if(!addresseRgx.test(data.get("num"))){
            toasterStore.displayErrorMessage("Numero d'addresse invalide");
        }else{
            demandeStore.addDemande(data)
        }
    }

    return (
        <div>
            <Button onClick={handleClick} variant="contained" color="success" size={"medium"} startIcon={<AddIcon/>}>
                Faire une demande
            </Button>

            <Dialog open={open} onClose={handleClose}>
                <DialogContent>
                    <ObserverAddDemandeForm handleSubmit={addDemande}/>
                </DialogContent>
            </Dialog>
        </div>
    )
}
export const ObserverAddDemandeModal = observer(AddDemandeModal)
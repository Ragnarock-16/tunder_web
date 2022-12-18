import {observer} from "mobx-react";
import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";
import {Dialog, DialogContent} from "@mui/material";
import {useState} from "react";
import {ObserverAddSyntheseForm} from "../molecule/AddSyntheseForm";
import {syntheseStore} from "../../stores/SyntheseStore";


function AddSyntheseModal(){
    const [open, setOpen] = useState(false);
    const handleClick = () => {
        setOpen(true);
    }
    const handleClose = () => {
        setOpen(false);
    }
    const uploadImage=(event)=>{
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        syntheseStore.uploadSynthese(data.get("bloc"),data.get("cours"),data.get("syntheseFile"))
    }
    return (
        <div>
            <Button onClick={handleClick} variant="contained" color="success" size={"medium"} startIcon={<AddIcon/>}>
                Ajouter une synthèse
            </Button>

            <Dialog open={open} onClose={handleClose}>
                <DialogContent>
                    <ObserverAddSyntheseForm handleSubmit={uploadImage}/>
                </DialogContent>
            </Dialog>
        </div>
    )
}
export const ObserverAddSyntheseModal = observer(AddSyntheseModal)
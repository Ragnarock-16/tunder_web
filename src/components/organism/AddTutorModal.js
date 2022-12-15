import {observer} from "mobx-react";
import Button from "@mui/material/Button";
import SchoolIcon from '@mui/icons-material/School';
import {Dialog, DialogContent} from "@mui/material";
import {useState} from "react";
import {ObserverAddDemandeForm} from "../molecule/AddDemandeForm";
import {ObserverAddTutorForm} from "../molecule/AddTutorForm";

function AddTutorModal(){
    const [open, setOpen] = useState(false);
    const handleClick = () => {
        setOpen(true);
    }
    const handleClose = () => {
        setOpen(false);
    }

    return (
        <div>
            <Button onClick={handleClick} variant="contained" color="warning" size={"medium"} startIcon={<SchoolIcon/>}>
                Devenir Tuteur
            </Button>

            <Dialog open={open} onClose={handleClose}>
                <DialogContent>
                    <ObserverAddTutorForm/>
                </DialogContent>
            </Dialog>
        </div>
    )
}
export const ObserverAddTutorModal = observer(AddTutorModal)
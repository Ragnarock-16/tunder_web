import {observer} from "mobx-react";
import Button from "@mui/material/Button";
import SchoolIcon from '@mui/icons-material/School';
import {Dialog, DialogContent} from "@mui/material";
import {useState} from "react";

function AddTutorModal(){
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

    }

    return (
        <div>
            <Button onClick={handleClick} variant="contained" color="warning" size={"medium"} startIcon={<SchoolIcon/>}>
                Devenir Tuteur
            </Button>

            <Dialog open={open} onClose={handleClose}>
                <DialogContent>
                </DialogContent>
            </Dialog>
        </div>
    )
}
export const ObserverAddTutorModal = observer(AddTutorModal)
import Button from "@mui/material/Button";
import AddIcon from '@mui/icons-material/Add';
import {observer} from "mobx-react";
import {adminStore} from "../../stores/AdminStore";
import {useState} from "react";
import {Dialog, DialogContent} from "@mui/material";
import SignUpForm from "./SignUpForm";

function AddUserModal(){
    const [open, setOpen] = useState(false);

    const handleClick = () => {
        setOpen(true);
    }
    const handleClose = () => {
        setOpen(false);
    }
    const addUser = (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        adminStore.addUser(...data.values())
    }

    return (
        <div>
            <Button onClick={handleClick} variant="contained" color="success" size={"large"} startIcon={<AddIcon/>}>
                Ajouter un utilisateur
            </Button>

            <Dialog open={open} onClose={handleClose}>
                <DialogContent>
                    <SignUpForm handleSubmit={addUser}/>
                </DialogContent>
            </Dialog>
        </div>
    )
}
export const ObserverAddUserModal = observer(AddUserModal)
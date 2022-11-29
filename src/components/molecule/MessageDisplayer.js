import {Alert, Snackbar} from "@mui/material";
import {observer} from "mobx-react";

function MessageDisplayer({open,message,severity}){
    return <Snackbar
        open={open}
        autoHideDuration={4000}
        anchorOrigin={{vertical: 'top', horizontal: 'center' }}
    >
        <Alert variant="filled"  severity={severity}>{message}</Alert>
    </Snackbar>
}

export const ObservedMessageDisplayer = observer(MessageDisplayer);
import {Alert, Snackbar} from "@mui/material";

export default function ErrorSnackbar({open,message,severity,close}){
    return <Snackbar
        open={open}
        autoHideDuration={4000}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        onClose={close}
    >
        <Alert severity={severity}>{message}</Alert>
    </Snackbar>
}
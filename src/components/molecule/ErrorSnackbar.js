import {Alert, Snackbar} from "@mui/material";

export default function ErrorSnackbar({open,message,severity}){
    return <Snackbar
        open={open}
        autoHideDuration={4000}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
    >
        <Alert severity={severity}>{message}</Alert>
    </Snackbar>
}
import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import {Link} from "react-router-dom";
import {authentificationStore} from "../../stores/AuthentificationStore";
import {userStore} from "../../stores/UserStore";

export default function ButtonAppBar() {

    const CheckAuth = () => {
        if(authentificationStore.isAuthenticated()){
            return <Button color="inherit" onClick={userStore.forgetUtilisateur} >Deconnexion</Button>
        }
    }

    return (
        <Box sx={{ flexGrow: 1, }}>
            <AppBar  position="static">
                <Toolbar className={"main"}>
                    <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                        TUnder
                    </Typography>
                    <Button color="inherit" component={Link} to={"/"}>Accueil</Button>
                    <Button color={"inherit"} component={Link} to={"/contact"}>Contact</Button>
                    {CheckAuth()}
                </Toolbar>
            </AppBar>
        </Box>
    );
}
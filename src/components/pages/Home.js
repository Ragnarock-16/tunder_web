import ButtonAppBar from "../organism/Navbar";
import Grid from '@mui/material/Grid';
import CssBaseline from '@mui/material/CssBaseline';
import Paper from '@mui/material/Paper';
import Avatar from '@mui/material/Avatar';
import DocumentScannerIcon from '@mui/icons-material/DocumentScanner';
import EmojiPeopleIcon from '@mui/icons-material/EmojiPeople';

import {green} from "@mui/material/colors";
import {ObserverLogin} from "../templates/Login";
import {ObservedMessageDisplayer} from "../molecule/MessageDisplayer";
import {toasterStore} from "../../stores/ToasterStore";
import {observer} from "mobx-react";
import {ObserverSignUp} from "../templates/SignUp";
import {authentificationStore} from "../../stores/AuthentificationStore";
function Home(){

    return(
        <div>
            <ButtonAppBar/>
            <Grid container component="main" sx={{ height: '100vh' }}>
                <CssBaseline />
                <Grid
                    sx={{
                        my: 8,
                        mx: 4,
                        display: 'flex',
                        flexDirection: 'row',
                        width: '50%',

                    }}
                >
                    <div>
                        <Avatar sx={{ m: 4, bgcolor: green,height: 120, width:120 }}>
                            <DocumentScannerIcon sx={{ height: 100, width:100 }} />
                        </Avatar>
                        <p>Nous possédent plus de 10 000 synthèses ! </p>
                    </div>
                    <div>
                        <Avatar sx={{ m: 4, bgcolor: 'primary.main',height: 120, width:120 }}>
                            <EmojiPeopleIcon sx={{ height: 100, width:100 }} />
                        </Avatar>
                        <p>Nous possédent plus de 10 000 étudiants !</p>
                    </div>
                </Grid>
                <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square sx={{width: '100%',}}>
                    {authentificationStore._isLogIn?  <ObserverLogin/> : <ObserverSignUp/> }
                    <ObservedMessageDisplayer message={toasterStore.message} open={toasterStore.open} severity={toasterStore.severity}/>
                </Grid>
            </Grid>
        </div>
    )
}
export const ObserverHome = observer(Home);
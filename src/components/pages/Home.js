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
import { useNavigate } from "react-router-dom";
import {useEffect} from "react";
import {syntheseStore} from "../../stores/SyntheseStore";
import {userStore} from "../../stores/UserStore";
function Home(){

    const navigate = useNavigate();

    useEffect(() => {
        if (authentificationStore.isAuthenticated()) {
            navigate("/horaire")
        }
        syntheseStore.getSyntheseCount()
        userStore.getUserCount()
    },[authentificationStore.isLogIn])

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
                        <p>Nous disposons de {syntheseStore.syntheseCount} synthèses ! </p>
                    </div>
                    <div>
                        <Avatar sx={{ m: 4, bgcolor: 'primary.main',height: 120, width:120 }}>
                            <EmojiPeopleIcon sx={{ height: 100, width:100 }} />
                        </Avatar>
                        <p>Notre communauté compte plus de {userStore.userCount} étudiants !</p>
                    </div>
                </Grid>
                <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square sx={{width: '100%',}}>
                    {authentificationStore.signUpMode?  <ObserverSignUp/> : <ObserverLogin/>  }
                    <ObservedMessageDisplayer message={toasterStore.message} open={toasterStore.open} severity={toasterStore.severity}/>
                </Grid>
            </Grid>
        </div>
    )
}
export const ObserverHome = observer(Home);
import ButtonAppBar from "../organism/Navbar";

import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import CssBaseline from '@mui/material/CssBaseline';
import Paper from '@mui/material/Paper';
import Avatar from '@mui/material/Avatar';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import DocumentScannerIcon from '@mui/icons-material/DocumentScanner';
import EmojiPeopleIcon from '@mui/icons-material/EmojiPeople';

export default function Home(){
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
                        <Avatar sx={{ m: 4, bgcolor: 'primary.main',height: 120, width:120 }}>
                            <DocumentScannerIcon sx={{ height: 100, width:100 }} />
                        </Avatar>
                        <p>Nous possédent plus de 10 000 synthèses !</p>
                    </div>
                    <div>
                        <Avatar sx={{ m: 4, bgcolor: 'primary.main',height: 120, width:120 }}>
                            <EmojiPeopleIcon sx={{ height: 100, width:100 }} />
                        </Avatar>
                        <p>Nous possédent plus de 10 000 étudiants !</p>
                    </div>
                </Grid>
                <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square sx={{width: '100%',}}>
                    <Box
                        sx={{
                            my: 8,
                            mx: 4,
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                        }}
                    >
                        <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                            <LockOutlinedIcon />
                        </Avatar>
                    </Box>
                </Grid>
            </Grid>
        </div>
    )
}
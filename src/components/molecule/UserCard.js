import {Card, TextField} from "@mui/material";
import {blue, red} from "@mui/material/colors";
import DoneSharpIcon from '@mui/icons-material/DoneSharp';
import BlockIcon from '@mui/icons-material/Block';
import DeleteIcon from '@mui/icons-material/Delete';
import Tip from "./Tip";
import {adminStore} from "../../stores/AdminStore";
import {observer} from "mobx-react";
import {useRef} from "react";

function UserCard({user}){
    const emailRef = useRef(null)
    const usernameRef = useRef(null)

    const handleDelete = () => {
        adminStore.deleteUser(user)
    }
    const handleBlock = () => {
        adminStore.blockUser(user)
    }
    const handleUpdate =() =>{
        adminStore.updateUser(user, emailRef.current.value, usernameRef.current.value)
    }
    return(
        <Card sx={{boxShadow:11}} className="usrCard">
            <div className="cardContent">
                <span>Username: </span><TextField inputRef={usernameRef} sx={{width:250}} defaultValue={user.username} variant="standard" size={"medium"}/>
            </div>
            <div className="cardContent">
                <span>Email: </span><TextField inputRef={emailRef} sx={{width:250}} defaultValue={user.email} variant="standard" size={"medium"}/>
            </div>
            <div className={"cardPanel"}>
                <button onClick={handleUpdate} className={'cardButton Done'}>
                    <Tip title={"Modifier"} child={<DoneSharpIcon/>}/>
                </button>
                <button onClick={handleBlock} className={'cardButton'}>
                    <Tip title={"Bloquer"} child={<BlockIcon/>}/>
                </button>
                <button onClick={handleDelete} className={'cardButton Delete'}>
                    <Tip title={"Suprimer"} child={<DeleteIcon/>}/>
                </button>
            </div>

        </Card>
    )
}
export const ObserverUserCard = observer(UserCard)

import {observer} from "mobx-react";
import ButtonAppBar from "../organism/Navbar";
import {ObservedMessageDisplayer} from "../molecule/MessageDisplayer";
import {toasterStore} from "../../stores/ToasterStore";
import {adminStore} from "../../stores/AdminStore";
import {useEffect} from "react";
import {ObserverUserCard} from "../molecule/UserCard";
import {ObserverAddUserModal} from "../organism/AddUserModal";

function AdminPanel(){

    useEffect(()=> {
        adminStore.getAllUsers()
    },[])

    useEffect(()=> {
        console.log("update")
    },[adminStore.users])

    return (

        <div>
            <ButtonAppBar/>
            <div className={'adminPanel'}>
                <h1>Admin Panel</h1>
                <div className={'cardContainer'}>
                    <ObserverAddUserModal/>
                </div>
                {adminStore.users.map((user) => <div className={"cardContainer"}><ObserverUserCard user={user}/></div>)}
            </div>
            <ObservedMessageDisplayer message={toasterStore.message} open={toasterStore.open} severity={toasterStore.severity}/>
        </div>
    )
}
export const ObserverAdminPanel = observer(AdminPanel)
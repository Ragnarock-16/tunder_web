import {userStore} from "../stores/UserStore";
import { Outlet, Navigate } from 'react-router-dom'
import {observer} from "mobx-react";

const AdminRoute = () => {
    const checkStatus = () => {
        if (userStore.getUserRole() === "Admin" && userStore.getUserExp() > Date.now()/1000) {
            return true
        }
        return false
    }
    return(checkStatus()?<Outlet/>:<Navigate to="/"/> )
}
export const ObserverAdminRoute = observer(AdminRoute)
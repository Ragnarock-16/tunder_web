import {userStore} from "../stores/UserStore";
import { Outlet, Navigate } from 'react-router-dom'
import {observer} from "mobx-react";

const AdminRoute = () => {
    const checkStatus = () => {
        if (userStore.getUserRole() === "Admin" || userStore.getUserExp() < Date.now()/1000) {
            return false
        }
        return true
    }
    return(checkStatus()? <Outlet/> : <Navigate to="/"/>)
}
export const ObserverAdminRoute = observer(AdminRoute)
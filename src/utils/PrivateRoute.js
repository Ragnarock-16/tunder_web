import {userStore} from "../stores/UserStore";
import { Outlet, Navigate } from 'react-router-dom'
import {observer} from "mobx-react";

const PrivateRoute = () => {
    const checkValidite = () => {
        if (userStore.getUserToken() === null || userStore.getUserExp() < Date.now()/1000) {
            return false
        }
        return true
    }
    return(checkValidite()? <Outlet/> : <Navigate to="/"/>)
}
export const ObserverPrivateRoute = observer(PrivateRoute)
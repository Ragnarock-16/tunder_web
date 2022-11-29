import {useEffect} from "react";

export default function GoogleAuth ({clientId,callbackResponse}){

    useEffect(() => {
        /* global google */
        google.accounts.id.initialize({client_id: clientId,callback:callbackResponse});
        google.accounts.id.renderButton(document.getElementById("signInDiv"),{theme: 'outline',size: 'large'});
    },[]);


    return <div id={"signInDiv"}> </div>

}
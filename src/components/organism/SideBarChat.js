import {ObserverCoursChatCard} from "../molecule/CoursChatCard";
import {chatStore} from "../../stores/ChatStore";
import {observer} from "mobx-react";
import {useEffect} from "react";


function SideBarChat(){

    useEffect(()=> {
            chatStore.getAllCours()
        },[])

    return (
        <div className={'sidebar'}>
            <h3 className={'chatTitle'}>Tunder Chat</h3>
            <div className={'chatList'}>
                {chatStore.allCours.map((cours) => {
                    return <ObserverCoursChatCard key={cours.nom} coursName={cours.nom}/>
                })}
            </div>
        </div>
    )
}
export const ObserverSideBarChat = observer(SideBarChat);

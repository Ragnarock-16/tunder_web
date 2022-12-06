import CoursChatCard from "./CoursChatCard";
import {chatStore} from "../../stores/ChatStore";
import {observer} from "mobx-react";

function SideBarChat(){
    return (
        <div className={'sidebar'}>
            <h3 className={'chatTitle'}>Tunder Chat </h3>
            <div className={'chatList'}>
                {console.log(chatStore.allCours)}
                {console.log(chatStore.allCours[1])}
                <CoursChatCard/>
            </div>
        </div>
    )
}
export const ObserverSideBarChat = observer(SideBarChat);

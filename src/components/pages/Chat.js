import SideBarChat, {ObserverSideBarChat} from "../molecule/SideBarChat";
import Messages from "../molecule/Messages";
import ButtonAppBar from "../organism/Navbar";

export default function Chat(){
    return (
        <div>
            <ButtonAppBar/>
            <div className={'chat'}>
                <div className={'container-chat'}>
                    <ObserverSideBarChat/>
                    <Messages/>

                </div>
            </div>
        </div>
    )
}
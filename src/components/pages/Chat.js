import  {ObserverSideBarChat} from "../organism/SideBarChat";
import  {ObserverMessages} from "../organism/Messages";
import ButtonAppBar from "../organism/Navbar";

export default function Chat(){
    return (
        <div>
            <ButtonAppBar/>
            <div className={'chat'}>
                <div className={'container-chat'}>
                    <ObserverSideBarChat/>
                    <ObserverMessages/>
                </div>
            </div>
        </div>
    )
}
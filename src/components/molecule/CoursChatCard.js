import {chatStore} from "../../stores/ChatStore";
import {observer} from "mobx-react";

function CoursChatCard({coursName}){
    const handleOnClick = () => {
        chatStore.getAllMessages(coursName)
        chatStore.selectedCours = coursName
    }
    return (
        <div className={'coursChatCard'} onClick={handleOnClick}>
            <span>{coursName}</span>
        </div>
    )
}
export const ObserverCoursChatCard = observer(CoursChatCard);
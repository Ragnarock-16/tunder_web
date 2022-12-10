import Message from "../molecule/Message";
import {ObserverMessageInput} from "../molecule/MessageInput";
import {observer} from "mobx-react";
import {chatStore} from "../../stores/ChatStore";

function Messages(){

    return (
        <div className={'messages'}>
            <div className={'messageInfo'}>
                <h3>Messages</h3>
            </div>

            <div className={'messageList'}>
                {chatStore.selectedCours!=null?chatStore.messages.map((message) => {
                    return <Message key={message.id} message={message}/>
                }):null}
            </div>
            <ObserverMessageInput/>
        </div>
    )
}
export const ObserverMessages = observer(Messages);
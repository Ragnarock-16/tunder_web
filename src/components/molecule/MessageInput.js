import {chatStore} from "../../stores/ChatStore";
import {observer} from "mobx-react";
import {useState} from "react";

function MessageInput(){

    const [message, setMessage] = useState('')
    const handleSendMessage = () => {
        chatStore.addMessage(message)
        setMessage('')
    }

    return (
        <div className={'messageInput'}>
            <input type="text" placeholder={'Entrer votre message'} onChange={event => setMessage(event.target.value)} value={message}/>
            <div className={'sendButton'}>
                    <button onClick={handleSendMessage}>Envoyer</button>
            </div>
        </div>
    )
}
export const ObserverMessageInput = observer(MessageInput);
import Message from "./Message";
import MessageInput from "./MessageInput";

export default function Messages(){
    return (
        <div className={'messages'}>
            <div className={'messageInfo'}>
                <h3>Messages</h3>
            </div>
            <div className={'messageList'}>
                <Message/>
                <Message/>
                <Message/>
                <Message/>
                <Message/>


            </div>
            <MessageInput/>

        </div>
    )
}
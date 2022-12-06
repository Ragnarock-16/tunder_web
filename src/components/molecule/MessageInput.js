import SendIcon from '@mui/icons-material/Send';
export default function MessageInput(){
    return (
        <div className={'messageInput'}>
            <input type="text" placeholder={'Entrer votre message'}/>
            <div className={'sendButton'}>
                    <button>Envoyer</button>
            </div>
        </div>
    )
}
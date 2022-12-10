import {userStore} from "../../stores/UserStore";
import {useEffect, useRef} from "react";

export default function Message({message}){

    const ref = useRef();

    useEffect(() => {
        ref.current?.scrollIntoView({ behavior: 'smooth' });
    },[message])

    const formatDate = (date) => {
        const d = date.toDate();
        const time = `${d.getDay()}/${d.getMonth()}/${d.getFullYear()} ${d.getHours()}:${d.getMinutes()<10?'0'+d.getMinutes():d.getMinutes()}`;
        return time;
    }
    return (
        <div ref={ref}>
            <div className={'messageHeader'}>
                <span className={'messageEmail'}> {message.email} {formatDate(message.createdAt)}</span>
            </div>
            {message.email===userStore.getUserEmail()?<div className={'messageContent owner'}>
                <p> {message.text}</p>
            </div>:<div className={'messageContent'}>
                <p> {message.text}</p>
            </div>}
        </div>
    )
}
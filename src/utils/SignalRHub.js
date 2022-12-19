import * as signalR from "@microsoft/signalr";
import config from "../config";
import {syntheseStore} from "../stores/SyntheseStore";
import {userStore} from "../stores/UserStore";
class SignalRHub{

    _hubConnection = undefined
    static instance = undefined

    constructor() {
        this._hubConnection = new signalR.HubConnectionBuilder()
            .withUrl(config.ApiHub + "/SignalHub").build()
        this._hubConnection.start()
        this.subscribeToEvents()
    }

    subscribeToEvents(){
        this._hubConnection.on("ReceiveSynthese", (nbr) => {
            syntheseStore.syntheseCount = nbr
            if(userStore.getUserToken()){
                syntheseStore.getAllSyntheses()
            }
        })

        this._hubConnection.on("ReceiveUsr", (nbr) => {
            userStore.userCount=nbr
        })
    }

    static getInstance(){
        if(SignalRHub.instance=== undefined){
            SignalRHub.instance = new SignalRHub()
        }
        return SignalRHub.instance
    }
}
export default SignalRHub.getInstance
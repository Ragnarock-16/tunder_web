import {makeAutoObservable} from "mobx";
import {api} from "../services/API";
import {toasterStore} from "./ToasterStore";
import {db} from "../firebase";
import {collection, getDocs,query,orderBy,limit, addDoc,Timestamp,onSnapshot} from "firebase/firestore"
import {userStore} from "./UserStore";
class ChatStore{
    _allCours = []
    _messages = []
    _selectedCours = null

    constructor(){
        makeAutoObservable(this)
    }
    set selectedCours(value) {
        this._selectedCours = value;
    }
    get selectedCours(){
        return this._selectedCours
    }
    set messages(value) {
        this._messages = value;
    }
    get messages() {
        return this._messages;
    }
    set allCours(value) {
        this._allCours = value;
    }
    get allCours() {
        return this._allCours;
    }

    getAllCours(){
        api.getAllCours().then(response => {
            if (response.status) {
                toasterStore.displayErrorMessage("Erreur lors de la récupération des cours")
            } else {
                this.allCours = response

            }
        })
    }
    async getAllMessages(coursName){
        const collectionRef = query(collection(db, coursName),orderBy("createdAt","asc"),limit(1000))
        onSnapshot(collectionRef, (doc) => {
            this.messages = []
            this.messages = doc.docs.map(doc => doc.data())
        })
    }

    async addMessage(message){
        const collectionRef = collection(db, this.selectedCours)

        const data = {
            createdAt:Timestamp.fromDate(new Date()),
            email: userStore.getUserEmail(),
            text: message,
        }
        await addDoc(collectionRef, data).catch((error) => {
            toasterStore.displayErrorMessage("Erreur lors de l'envoi du message")
        })
    }
}export const chatStore = new ChatStore();
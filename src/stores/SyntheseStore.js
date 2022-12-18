import {makeAutoObservable} from "mobx";
import {api} from "../services/API";
import {toasterStore} from "./ToasterStore";
import moment from "moment";
import {storage} from "../firebase";
import {ref, uploadBytes,getDownloadURL} from "firebase/storage";
import {v4} from "uuid";
import {userStore} from "./UserStore";


class SyntheseStore{
    _syntheses = []
    _syntheseCount = undefined
    constructor(){
        makeAutoObservable(this)
    }
    set syntheseCount(value) {
        this._syntheseCount = value;
    }
    get syntheseCount(){
        return this._syntheseCount
    }
    set syntheses(syntheses){
        this._syntheses = syntheses
    }
    get syntheses(){
        return this._syntheses
    }
    getSyntheseCount(){
        api.getSyntheseCount().then(response => {
            if(!response.status) {
                this.syntheseCount = response
            }
        })
    }

    getAllSyntheses(){
        api.getSynthese(localStorage.getItem('token')).then(response => {
            if(response.status){
                response.status===404?toasterStore.displayErrorMessage("Aucune synthese n'a été trouvée"):toasterStore.displayErrorMessage("Erreur lors de la récupération des synthèses")
            }else{
                this.syntheses=this.formatData(response)
            }
        })
    }
    formatData(data){
        let formattedData = []
        data.forEach(synthese => {
            formattedData.push({
                id: synthese.id,
                Bloc: synthese.cours.bloc,
                Cours: synthese.cours.nom,
                Date: moment(synthese.creationDate).format("DD/MM/YYYY"),
                Auteur: synthese.auteur,
                File_Name: synthese.url
            })
        })
        return formattedData
    }
    uploadSynthese(bloc,cours,file){
        if(file.size===0||!bloc||!cours){
            toasterStore.displayErrorMessage("Veuillez remplir tous les champs")
        }
        else{
            const imgRef = ref(storage, `syntheses/${this.getFileNameFormated(file.name)}`)
            const synthese = JSON.stringify({id:0,creationDate:moment(),url:imgRef.name,autheur:userStore.getUserName(),cours:{bloc:bloc,nom:cours}})
            uploadBytes(imgRef, file).then((snapshot) => {
                api.addSynthese(userStore.getUserToken(),synthese).then(response => {
                    if(response.status!==200){
                        toasterStore.displayErrorMessage("Erreur lors de l'upload de la synthèse")
                    }else{
                        toasterStore.displayConfirmMessage("Synthèse ajoutée avec succès")
                        this.getAllSyntheses()
                    }
                })
            });
        }
    }
    getFileNameFormated(fileName){
        const extPos =  fileName.lastIndexOf('.')
        const name = fileName.substring(0,extPos)
        const ext = fileName.substring(extPos)
        return name + v4()+ ext
    }

    downloadSynthese(fileName){
        const imgRef = ref(storage, `syntheses/${fileName}`)
        getDownloadURL(imgRef).then((url) => {
            const xhr = new XMLHttpRequest();
            xhr.responseType = 'blob';
            xhr.onload = (event) => {
                const blob = xhr.response;
                const link = document.createElement('a');
                link.href = window.URL.createObjectURL(blob);
                link.download = fileName;
                link.click();
            };
            xhr.open('GET', url);
            xhr.send();
        }).catch((error) => {
            toasterStore.displayErrorMessage("Erreur lors du téléchargement de la synthèse")
        })
    }
}
export const syntheseStore = new SyntheseStore()
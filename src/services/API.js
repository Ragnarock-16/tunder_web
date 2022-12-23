import config from '../config.json'

class API {
    API_URL = config.ApiUrl

    signIn(email, password) {
        return fetch(`${this.API_URL}/Users/SignIn`,
            {
                method: 'POST',
                body: JSON.stringify({username: '', email: email, password: password}),
                headers: {'Content-Type': 'application/json'}
            }).then(response => response.status === 200 ? response.json() : response)
    }

    oauthSignIn(token) {
        return fetch(`${this.API_URL}/Users/SignIn-google`,
            {
                method: 'POST',
                body: JSON.stringify(token),
                headers: {'Content-Type': 'application/json'}
            }).then(response => response.status === 200 ? response.json() : response)
    }

    signUp(user) {
        return fetch(`${this.API_URL}/Users/SignUp`, {
            method: 'POST',
            body: JSON.stringify(user),
            headers: {'Content-Type': 'application/json'}
        }).then(response => response.status !== 200 ? response.json() : response.status)
    }

    getHoraireLink(token) {
        return fetch(`${this.API_URL}/Horaire`, {
            method: 'GET',
            headers: {'Authorization': `bearer ${token}`}
        }).then(response => response.status === 200 ? response.json() : response)

    }

    setHoraireLink(token, link) {
        return fetch(`${this.API_URL}/Horaire/`+encodeURIComponent(link), {
            method: 'PUT',
            headers: {'Authorization': `bearer ${token}`}
        }).then(response => response.status)
    }

    async getAllCours(){
         return await fetch(`${this.API_URL}/Cours`, {
            method: 'GET',
            headers: {'Content-Type': 'application/json'}
        }).then(response => response.status === 200 ? response.json() : response)
    }

    getUsers(token){
        return fetch(`${this.API_URL}/Users`, {
            method: 'GET',
            headers: {'Authorization': `bearer ${token}`}
        }).then(response => response.status === 200 ? response.json() : response)
    }

    blockUser(token, user){
        return fetch(`${this.API_URL}/Users/` +encodeURIComponent(user.email)+'/User/Status', {
            method: 'PUT',
            headers: {'Authorization': `bearer ${token}`}
        }).then(response => response.status)
    }
    getUserStatus(token, user){
        return fetch(`${this.API_URL}/Users/` +encodeURIComponent(user.email)+'/User/Status', {
            method: 'GET',
            headers: {'Authorization': `bearer ${token}`}
        }).then(response => response.status===200 ? response.text() : response)
    }
    updateUser(token, user, emailUpdate, usernameUpdate){
        return fetch(`${this.API_URL}/Users/User/?email=` +
            encodeURIComponent(user.email)+`&updateEmail=`+
            encodeURIComponent(emailUpdate)+`&updateUsername=`+
            encodeURIComponent(usernameUpdate),
            {
            method: 'PUT',
            body: JSON.stringify({email: emailUpdate, username: usernameUpdate}),
            headers: {'Authorization': `bearer ${token}`, 'Content-Type': 'application/json'}
        }).then(response => response.status)
    }
    deleteUser(token, user){
        return fetch(`${this.API_URL}/Users/User/?email=` +encodeURIComponent(user.email), {
            method: 'DELETE',
            headers: {'Authorization': `bearer ${token}`}
        }).then(response => response.status)
    }
    contact(email, message){
        return fetch(`${this.API_URL}/Contact`, {
            method: 'POST',
            body: JSON.stringify({from: email,to:"" ,body: message}),
            headers: {'Content-Type': 'application/json'}
        }).then(response => response.status)
    }

    async getSynthese(token){
        return await fetch(`${this.API_URL}/Syntheses/Synthese`, {
            method: 'GET',
            headers: {'Authorization': `bearer ${token}`}
        }).then(response => response.status === 200 ? response.json() : response)
    }

    getSyntheseCount(){
        return fetch(`${this.API_URL}/Syntheses/Statistique`, {
            method: 'GET',
            headers: {'Content-Type': 'application/json'}
        }).then(response => response.status === 200 ? response.json() : response)
    }
    addSynthese(token,synthese) {
        return fetch(`${this.API_URL}/Syntheses/Synthese`, {
            method: 'POST',
            body: synthese,
            headers: {'Authorization': `bearer ${token}`, 'Content-Type': 'application/json'},
        }).then(response => response)
    }
    getUserCount(){
        return fetch(`${this.API_URL}/Users/Statistique`, {
            method: 'GET',
            headers: {'Content-Type': 'application/json'}
        }).then(response => response.status === 200 ? response.json() : response)
    }

    async getDemande(token){
        return await fetch(`${this.API_URL}/Tutorats`, {
            method: 'GET',
            headers: {'Authorization': `bearer ${token}`}
        }).then(response => response.status === 200 ? response.json() : response)
    }
    async getCours(){
        return await fetch(`${this.API_URL}/Cours`, {
            method: 'GET',
            headers: {'Content-Type': 'application/json'}
        }).then(response => response.status === 200 ? response.json() : response)
    }
    getTutors(token,bloc, cours){
        return fetch(`${this.API_URL}/Cours/`+encodeURIComponent(bloc)+`/Bloc/`+encodeURIComponent(cours), {
            method: 'GET',
            headers: {'Authorization': `bearer ${token}`}
        }).then(response => response.status === 200 ? response.json() : response)
    }

    becomeTutor(token, cours){

        return fetch(`${this.API_URL}/Cours/Tuteur`, {
            method: 'PUT',
            body: JSON.stringify(cours),
            headers: {'Authorization': `bearer ${token}`,'Content-Type': 'application/json'}
        }).then(response => response.status)
    }

    addDemande(token, demande){
        return fetch(`${this.API_URL}/Tutorats/Tutorat`, {
            method: 'POST',
            body: JSON.stringify(demande),
            headers: {'Authorization': `bearer ${token}`, 'Content-Type': 'application/json'}
        }).then(response => response.status)
    }
    updateDemande(token, demande){
        return fetch(`${this.API_URL}/Tutorats/Tutorat/Status`, {
            method: 'PUT',
            body: JSON.stringify(demande),
            headers: {'Authorization': `bearer ${token}`, 'Content-Type': 'application/json'}
        }).then(response => response.status)
    }
}
export const api = new API()
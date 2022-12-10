import config from '../config.json'

class API {
    API_URL = config.ApiUrl

    signIn(email, password) {
        return fetch(`${this.API_URL}/Auth/token`,
            {
                method: 'POST',
                body: JSON.stringify({username: '', email: email, password: password}),
                headers: {'Content-Type': 'application/json'}
            }).then(response => response.status === 200 ? response.json() : response)
    }

    oauthSignIn(token) {
        return fetch(`${this.API_URL}/Auth/signin-google`,
            {
                method: 'POST',
                body: JSON.stringify(token),
                headers: {'Content-Type': 'application/json'}
            }).then(response => response.status === 200 ? response.json() : response)
    }

    signUp(user) {
        return fetch(`${this.API_URL}/Auth/signUp`, {
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
        console.log(`${this.API_URL}/Horaire?link=`+encodeURIComponent(link))
        return fetch(`${this.API_URL}/Horaire?link=`+encodeURIComponent(link), {
            method: 'PUT',
            headers: {'Authorization': `bearer ${token}`}
        }).then(response => response.status)
    }

    async getAllCours(){
         return await fetch(`${this.API_URL}/Cours/cours`, {
            method: 'GET',
            headers: {'Content-Type': 'application/json'}
        }).then(response => response.status === 200 ? response.json() : response)
    }

    getUsers(token){
        return fetch(`${this.API_URL}/Auth/Users`, {
            method: 'GET',
            headers: {'Authorization': `bearer ${token}`}
        }).then(response => response.status === 200 ? response.json() : response)
    }

    blockUser(token, user){
        return fetch(`${this.API_URL}/Auth/Status/` +encodeURIComponent(user.email), {
            method: 'PUT',
            headers: {'Authorization': `bearer ${token}`}
        }).then(response => response.status)
    }
    getUserStatus(token, user){
        return fetch(`${this.API_URL}/Auth/Status/` +encodeURIComponent(user.email), {
            method: 'GET',
            headers: {'Authorization': `bearer ${token}`}
        }).then(response => response.status===200 ? response.text() : response)
    }
    updateUser(token, user, emailUpdate, usernameUpdate){
        return fetch(`${this.API_URL}/Auth/User/?email=` +
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
        return fetch(`${this.API_URL}/Auth/User/?email=` +encodeURIComponent(user.email), {
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

}
export const api = new API()
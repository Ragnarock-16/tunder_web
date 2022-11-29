import config from '../config.json'

class API{
  API_URL = config.ApiUrl

  signIn(email, password){
      return fetch(`${this.API_URL}/Auth/token`,
          {method: 'POST',
              body: JSON.stringify({username: '', email: email, password: password}),
              headers: {'Content-Type': 'application/json'}}).then(response => response.status===200?response.json():response)
  }

  oauthSignIn(token) {
      return fetch(`${this.API_URL}/Auth/signin-google`,
          {
              method: 'POST',
              body: JSON.stringify(token),
              headers: {'Content-Type': 'application/json'}}).then(response => response.status===200?response.json():response)
    }

    signUp(user) {
      return fetch(`${this.API_URL}/Auth/signUp`,{
            method: 'POST',
            body: JSON.stringify(user),
            headers: {'Content-Type': 'application/json'}}).then(response => response.status!==200?response.json():response.status)
      }

}
export const api = new API();
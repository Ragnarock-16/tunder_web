
class API{
  API_URL = "http://127.0.0.1:5000/api"

  get url(){
      return this.API_URL;
  }

  loadCours(bloc){
      return fetch('${this.base}/Cours/${bloc}').then(resp =>resp.json)
  }

  
}
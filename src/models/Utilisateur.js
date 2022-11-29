export default class Utilisateur{
    _username;
    _email;
    _token;

    constructor(username, email, token) {
        this._username = username;
        this._email = email;
        this._token = token;
    }

    set username(value) {
        this._username = value;
    }
    get username() {
        return this._username;
    }
    set email(value) {
        this._email = value;
    }
    get email() {
        return this._email;
    }
    set token(value) {
        this._token = value;
    }
    get token() {
        return this._token;
    }
}
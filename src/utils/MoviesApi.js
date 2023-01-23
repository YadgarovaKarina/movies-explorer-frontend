export class MoviesApi {
    constructor(options) {
        this._url = options.url;
        this._headers = options.headers;
    }

    _handleStatus(res) {
        if (res.ok) {
            return res.json();
        }
        return Promise.reject(`Ошибка: ${res.status}`);
    }

    getFilms() {
        return fetch(`${this._url}/movies`, {
            headers: this._headers
        }).then(this._handleStatus);
    }

}

export const ApiMovies = new MoviesApi({
    url: 'https://api.nomoreparties.co/beatfilm-movies',
    headers: {
        Authorization: '',
        'Content-Type': 'application/json'
    }
});
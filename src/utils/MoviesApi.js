export class MoviesApi {
    constructor(options) {
        this._url = options.url;
        this._headers = options.headers;
    }

    _handleStatus(res) {
        return res.json()
            .then((response) => {
                if (res.ok) {
                    return (response)
                }
                return Promise.reject(new Error(response.message));
            })
    }

    getMoviesCard() {
        return fetch(`${this._url}`, {
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
export class MainApi {
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

  register(name, email, password) {
    return fetch(`${this._url}/signup`,
      {
        method: 'POST',
        headers: this._headers,
        body: JSON.stringify({ name, email, password })
      })
      .then(this._handleStatus)
  };

  authorize(email, password) {
    return fetch(`${this._url}/signin`, {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify({ email, password })
    })
      .then(this._handleStatus)
  }

  setToken(token) {
    this._headers.Authorization = `Bearer ${token}`
  }

  getUserInfo() {
    return fetch(`${this._url}/users/me`, {
      headers: this._headers
    }).then(this._handleStatus);
  }

  editUserInfo(name, email) {
    console.log('Попали')
    return fetch(`${this._url}/users/me`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({ name, email })
    }).then(this._handleStatus)
  }

  deleteCard(id) {
    return fetch(`${this._url}/movies/${id}`, {
      method: 'DELETE',
      headers: this._headers
    }).then(this._handleStatus)
  }

  saveCard(card) {
    return fetch(`${this._url}/movies`, {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify(card)
    }).then(this._handleStatus)
  }

  getMoviesCard() {
    return fetch(`${this._url}/movies`, {
      headers: this._headers
    }).then(this._handleStatus);
  }

}

export const ApiMain = new MainApi({
  // url: 'https://api.movies.yadgarova.k.nomoredomains.club',
  url: 'http://localhost:3002',
  headers: {
    Authorization: '',
    'Content-Type': 'application/json'
  }
});
export class MainApi {
  constructor(options) {
    this._url = options.url;
    this._headers = options.headers;
  }

  _handleStatus(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res}`);
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
    return fetch(`${this._url}/users/me`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({ name, email })
    }).then(this._handleStatus)
  }

}

export const ApiMain = new MainApi({
  url: 'http://localhost:3002',
  headers: {
    Authorization: '',
    'Content-Type': 'application/json'
  }
});
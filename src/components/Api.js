export default class Api {
    constructor(settings) {
        this.settings = settings
    }

    getUser() {
        return this._get(`/users/me`);
    }

    updateUser(user) {
        return this._patch('/users/me', {
            body: JSON.stringify(user)
        });
    }

    updateUserAvatar(avatar) {
        return this._patch('/users/me/avatar', {
            body: JSON.stringify({avatar})
        })
    }

    getCardList() {
        return this._get('/cards')
    }

    createCard(card) {
        return this._post('/cards', {
            body: JSON.stringify(card)
        })
    }

    addCardLike(cardId) {
        return this._put(`/cards/${cardId}/likes`)
    }

    removeCardLike(cardId) {
        return this._delete(`/cards/${cardId}/likes`)
    }

    deleteCard(id) {
        return this._delete(`/cards/${id}`)
    }

    _get(url, options = {}) {
        return this._request('GET', url, options);
    }

    _post(url, options = {}) {
        return this._request('POST', url, options);
    }

    _put(url, options = {}) {
        return this._request('PUT', url, options);
    }

    _patch(url, options = {}) {
        return this._request('PATCH', url, options);
    }

    _delete(url, options = {}) {
        return this._request('DELETE', url, options);
    }

    _request(method, url, options) {
        return fetch(`${this.settings.baseUrl}${url}`, {
            method: method,
            headers: this.settings.headers,
            ...options,
        }).then((response) => {
            if (response.ok) {
                return response.json();
            }

            // если ошибка, отклоняем промис
            return Promise.reject(`Ошибка: ${res.status}`);
        });
    }
}
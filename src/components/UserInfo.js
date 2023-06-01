export default class UserInfo {
    constructor(selectors) {
        this._nameElement = document.querySelector(selectors.name)
        this._aboutElement = document.querySelector(selectors.about)
        this._avatarElement = document.querySelector(selectors.avatar)
    }

    getUserInfo() {
        return {
            name: this._nameElement.textContent,
            about: this._aboutElement.textContent,
            id: this._id,
        }
    }

    setUserInfo(userInfo) {
        if (userInfo.name) {
            this._nameElement.textContent = userInfo.name;
        }

        if (userInfo.about) {
            this._aboutElement.textContent = userInfo.about;
        }

        if (userInfo.avatar) {
            this._avatarElement.setAttribute('src', userInfo.avatar);
        }

        if (userInfo._id) {
            this._id = userInfo._id;
        }
    }
}

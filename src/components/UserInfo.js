export default class UserInfo {
    constructor(selectors) {
        this._nameElement = document.querySelector(selectors.name)
        this._aboutElement = document.querySelector(selectors.about)
        this._avatarElement = document.querySelector(selectors.avatar)
    }

    getUserInfo(){
        return {
            name: this._nameElement.textContent,
            about: this._aboutElement.textContent,
            id: this._id,
        }
    }

    setUserInfo(userInfo){
        this._nameElement.textContent = userInfo.name;
        this._aboutElement.textContent = userInfo.about;
        this._avatarElement.setAttribute('src', userInfo.avatar);
        this._id = userInfo._id;
    }
}

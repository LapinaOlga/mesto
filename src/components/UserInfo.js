export default class UserInfo {
    constructor(selectors) {
        this._nameElement = document.querySelector(selectors.name)
        this._professionElement = document.querySelector(selectors.profession)
    }

    getUserInfo(){
        return {
            name: this._nameElement.textContent,
            profession: this._professionElement.textContent
        }
    }

    setUserInfo(userInfo){
        this._nameElement.textContent = userInfo.name;
        this._professionElement.textContent = userInfo.profession;
    }
}

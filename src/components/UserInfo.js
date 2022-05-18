export default class UserInfo {
  constructor ({nameSelector, infoSelector, avatarSelector}) {
    this._nameElement = document.querySelector(nameSelector);
    this._infoElement = document.querySelector(infoSelector);
    this._avatarElement = document.querySelector(avatarSelector);
  }


  getUserId() {
    return this._userId;
  }


  setUserId(userId) {
    this._userId = userId;
  }


  setUserAvatar(link) {
    this._avatarElement.src = link;
  }


  getUserInfo () {
    return {
      name: this._nameElement.textContent,
      info: this._infoElement.textContent
    };
  }


  setUserInfo ({name, about}) {
    this._nameElement.textContent = name;
    this._infoElement.textContent = about;
  }

}

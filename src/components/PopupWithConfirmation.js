import Popup from "./Popup.js";

export default class PopupWithConfirmation extends Popup {
  constructor (popupSelector, submitHandlerForm) {
    super(popupSelector);
    this._submitHandlerForm = submitHandlerForm;
    this._formElement = this._popupElement.querySelector('.popup__form');
  }


  setEventListeners () {
    super.setEventListeners();
    this._popupElement.addEventListener('submit', (evt) => this._submitHandlerForm(evt));
  }


  close () {

    super.close();
  }

}

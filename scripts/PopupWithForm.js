import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
  constructor (popupSelector, submitHandlerForm) {
    super(popupSelector);
    this._submitHandlerForm = submitHandlerForm;
  }


  _getInputValues () {
    this._inputList = Array.from(this._popupElement.querySelectorAll('.popup__input'));
    this._inputValues = {};
    this._inputList.forEach((input) => this._inputValues[input.name] = input.value);
    return this._inputValues;
  }


  setEventListeners () {
    super.setEventListeners();
    this._popupElement.addEventListener('submit', (evt) => this._submitHandlerForm(evt, this._getInputValues()));
  }


  close () {
    this._formElement = this._popupElement.querySelector('.popup__form');
    this._formElement.reset();
    super.close();
  }

}

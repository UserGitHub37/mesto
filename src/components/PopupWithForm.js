import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
  constructor (popupSelector, submitHandlerForm) {
    super(popupSelector);
    this._submitHandlerForm = submitHandlerForm;
    this._inputList = Array.from(this._popupElement.querySelectorAll('.popup__input'));
    this._formElement = this._popupElement.querySelector('.popup__form');
    this._submitButton = this._formElement.querySelector('.popup__submit-button');
    this._initialSubmitButtonText = this._submitButton.textContent;
  }


  _getInputValues () {
    this._inputValues = {};
    this._inputList.forEach((input) => this._inputValues[input.name] = input.value);
    return this._inputValues;
  }


  setEventListeners () {
    super.setEventListeners();
    this._formElement.addEventListener('submit', (evt) => {
      this._submitHandlerForm(evt, this._getInputValues());
    });
  }

  renderLoading () {
    this._submitButton.textContent = 'Сохранение...';
  }

  close () {
    this._formElement.reset();
    this._submitButton.textContent = this._initialSubmitButtonText;
    super.close();
  }

}

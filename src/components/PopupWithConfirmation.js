import Popup from "./Popup.js";

export default class PopupWithConfirmation extends Popup {
  constructor (popupSelector, submitHandlerForm) {
    super(popupSelector);
    this._submitHandlerForm = submitHandlerForm;
    this._submitButtonElement = this._popupElement.querySelector('.popup__submit-button');
  }


  setEventListeners () {
    this._submitButtonElement.addEventListener('click', (evt) => {
      this._submitHandlerForm(evt, this._confirmationData);
    });

    super.setEventListeners();

  }

  open(confirmationData) {
    super.open();
    this._confirmationData = confirmationData;
  }

}

export default class Popup {
  constructor (popupSelector) {
    this._popupSelector = popupSelector;
    this._popupElement = document.querySelector(popupSelector);
  }


  open () {
    this._popupElement.classList.add('popup_opened');
    document.addEventListener('keydown', this._handleEscClose.bind(this));
  }


  close () {
    document.removeEventListener('keydown', this._handleEscClose.bind(this));
    this._popupElement.classList.remove('popup_opened');
  }


  _handleEscClose (evt) {
    if (evt.key === "Escape") {
      this.close();
    }
  }


  setEventListeners () {
    this._popupElement.addEventListener('click', (evt) => {
      if (evt.target.classList.contains('popup__close-button')) {
        this.close();
      }
    });

    this._popupElement.addEventListener('mousedown', (evt) => {
      if (evt.target.classList.contains('popup')) {
        this.close();
      }
    });
  }

}

import Popup from "./Popup.js";

export default class PopupWithImage extends Popup {
  constructor (popupSelector) {
    super(popupSelector);
    this._enlargedImage = this._popupElement.querySelector('.popup__enlarged-image');
    this._imagePopupTitle = this._popupElement.querySelector('.popup__title_type_image');
  }


  open (name, link) {
    this._enlargedImage.src = link;
    this._enlargedImage.alt = name;
    this._imagePopupTitle.textContent = name;

    super.open();
  }

}

import { imagePopup, enlargedImage, imagePopupTitle, openPopup } from './utils.js';


export class Card {
  constructor(cardData, templateSelector) {
    this._cardData = cardData;
    this._templateSelector = templateSelector;
  }


  _openPopupImage () {
    enlargedImage.src = this._cardData.link;
    enlargedImage.alt = this._cardData.name;
    imagePopupTitle.textContent = this._cardData.name;
    openPopup(imagePopup);
  }


  _toggleLike () {
    this._cardHeart.classList.toggle('card__heart_active');
  }


  _removeCard () {
    this._cardElement.remove();
    this._cardElement = null;
  }


  createCard () {
    this._cardElement = document
      .querySelector(this._templateSelector)
      .content.firstElementChild.cloneNode(true);

    const cardRemoveButton = this._cardElement.querySelector('.card__remove-button');
    this._cardTitle = this._cardElement.querySelector('.card__title');
    this._cardImage = this._cardElement.querySelector('.card__image');
    this._cardHeart = this._cardElement.querySelector('.card__heart');

    this._cardTitle.textContent = this._cardData.name;
    this._cardImage.src = this._cardData.link;
    this._cardImage.alt = this._cardData.name;

    cardRemoveButton.addEventListener('click', () => this._removeCard());
    this._cardImage.addEventListener('click', () => this._openPopupImage());
    this._cardHeart.addEventListener('click', () => this._toggleLike());

    return this._cardElement;
  }

}

import { imagePopup, enlargedImage, imagePopupTitle, openPopup } from './utils.js';


export class Card {
  constructor(cardData, templateSelector) {
    this._cardData = cardData;
    this._templateSelector = templateSelector;
  }


  _openPopupImage () {
    const imageDescription = this._cardTitle.textContent;
    enlargedImage.src = this._cardImage.src;
    enlargedImage.alt = imageDescription;
    imagePopupTitle.textContent = imageDescription;
    openPopup(imagePopup);
  }


  _toggleLike () {
    this._cardHeart.classList.toggle('card__heart_active');
  }


  _removeCard () {
    this._cardElement.remove();
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

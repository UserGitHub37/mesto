export default class Card {
  constructor({cardData, handleCardClick}, templateSelector) {
    this._name = cardData.name;
    this._link = cardData.link;
    this._handleCardClick = handleCardClick;
    this._templateSelector = templateSelector;
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

    this._cardTitle.textContent = this._name;
    this._cardImage.src = this._link;
    this._cardImage.alt = this._name;

    cardRemoveButton.addEventListener('click', () => this._removeCard());
    this._cardImage.addEventListener('click', () => this._handleCardClick(this._name, this._link));
    this._cardHeart.addEventListener('click', () => this._toggleLike());

    return this._cardElement;
  }

}

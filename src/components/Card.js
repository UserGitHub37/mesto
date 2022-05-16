export default class Card {
  constructor({cardData, userId, handleCardClick, handleLikeClick}, templateSelector) {
    this._name = cardData.name;
    this._link = cardData.link;
    this._cardLikes = cardData.likes;
    this._ownerId = cardData.owner._id;
    this._handleCardClick = handleCardClick;
    this._handleLikeClick = handleLikeClick;
    this._templateSelector = templateSelector;
    this._cardId = cardData._id;
    this._userId = userId;

  }

  _hasMyLike() {
    return this._cardLikes.find(item => item._id == this._userId);
  }


  _setLike (isLike) {
    if (isLike) {
      this._cardHeart.classList.add('card__heart_active');
    } else {
      this._cardHeart.classList.remove('card__heart_active');
    }
  }


  _removeCard () {
    this._cardElement.remove();
    this._cardElement = null;
  }


  updateLike (cardLikes) {
    this._cardLikes = cardLikes;
    this._numberOfLikes = cardLikes.length;
    this._cardLikeCounter.textContent = this._numberOfLikes;
    if (this._hasMyLike()) {
      this._setLike(true);
    } else {
      this._setLike(false);
    }

  }


  createCard () {
    this._cardElement = document
      .querySelector(this._templateSelector)
      .content.firstElementChild.cloneNode(true);

    const cardRemoveButton = this._cardElement.querySelector('.card__remove-button');
    this._cardTitle = this._cardElement.querySelector('.card__title');
    this._cardImage = this._cardElement.querySelector('.card__image');
    this._cardHeart = this._cardElement.querySelector('.card__heart');
    this._cardLikeCounter = this._cardElement.querySelector('.card__like-counter');

    this.updateLike (this._cardLikes);

    this._cardTitle.textContent = this._name;
    this._cardImage.src = this._link;
    this._cardImage.alt = this._name;

    cardRemoveButton.addEventListener('click', () => this._removeCard());
    this._cardImage.addEventListener('click', () => this._handleCardClick(this._name, this._link));

    this._cardHeart.addEventListener('click', (evt) => {
      this._handleLikeClick(this, this._cardId, evt.target.classList.contains('card__heart_active'));
    });

    return this._cardElement;
  }

}

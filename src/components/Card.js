export default class Card {
  constructor({cardData, userId, handleCardClick, handleLikeClick, handleDeleteIconClick}, templateSelector) {
    this._name = cardData.name;
    this._link = cardData.link;
    this._cardLikes = cardData.likes;
    this._ownerId = cardData.owner._id;
    this._handleCardClick = handleCardClick;
    this._handleLikeClick = handleLikeClick;
    this._handleDeleteIconClick = handleDeleteIconClick;
    this._templateSelector = templateSelector;
    this.cardId = cardData._id;
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
    this.cardElement = document
      .querySelector(this._templateSelector)
      .content.firstElementChild.cloneNode(true);

    const cardRemoveButton = this.cardElement.querySelector('.card__remove-button');
    this._cardTitle = this.cardElement.querySelector('.card__title');
    this._cardImage = this.cardElement.querySelector('.card__image');
    this._cardHeart = this.cardElement.querySelector('.card__heart');
    this._cardLikeCounter = this.cardElement.querySelector('.card__like-counter');
    this._cardTitle.textContent = this._name;
    this._cardImage.src = this._link;
    this._cardImage.alt = this._name;

    this.updateLike(this._cardLikes);

    if (this._ownerId == this._userId) {
      cardRemoveButton.addEventListener('click', () => this._handleDeleteIconClick(this));
    } else {
      cardRemoveButton.remove();
    }

    this._cardImage.addEventListener('click', () => this._handleCardClick(this._name, this._link));

    this._cardHeart.addEventListener('click', (evt) => {
      this._handleLikeClick(this, evt.target.classList.contains('card__heart_active'));
    });

    return this.cardElement;
  }

}

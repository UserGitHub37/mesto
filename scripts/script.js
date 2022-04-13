const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];


const cardsContainer = document.querySelector('.elements__wrapper');

const profile = document.querySelector('.profile');
const profileName = profile.querySelector('.profile__name');
const profileInfo = profile.querySelector('.profile__info');
const profileEditButton = profile.querySelector('.profile__edit-button');

const profilePopup = document.querySelector('.popup_profile');
const profileFormElement = profilePopup.querySelector('.popup__form');
const profileNameInput = profileFormElement.querySelector('.popup__input_field_name-profile');
const profileAboutInput = profileFormElement.querySelector('.popup__input_field_about-profile');
const profileSubmitButton = profileFormElement.querySelector('.popup__submit-button');

const placeAddButton = profile.querySelector('.profile__add-button');
const placePopup = document.querySelector('.popup_place');
const placeFormElement = placePopup.querySelector('.popup__form');
const placeNameInput = placeFormElement.querySelector('.popup__input_field_name-place');
const placeImageLinkInput = placeFormElement.querySelector('.popup__input_field_link-place');
const placeSubmitButton = placeFormElement.querySelector('.popup__submit-button');

const imagePopup = document.querySelector('.popup_image');
const enlargedImage = imagePopup.querySelector('.popup__enlarged-image');
const imagePopupTitle = imagePopup.querySelector('.popup__title_type_image');

const popups = Array.from(document.querySelectorAll('.popup'));


function closePopup (popup) {
  document.removeEventListener('keydown', handleEscUp);
  popup.classList.remove('popup_opened');
}


function handleEscUp (evt) {
  if (evt.key === "Escape") {
    const activePopup = document.querySelector('.popup_opened');
    closePopup(activePopup);
  }
}


function openPopup (popup) {
  popup.classList.add('popup_opened');
  document.addEventListener('keydown', handleEscUp);
}


function openPopupProfile () {
  formValidators.popupFormProfile.disableButton();
  profileNameInput.value = profileName.textContent;
  profileAboutInput.value = profileInfo.textContent;
  openPopup(profilePopup);
}


function openPopupPlace () {
  formValidators.popupFormPlace.disableButton(placeSubmitButton, 'popup__submit-button_disabled');
  placeNameInput.value = null;
  placeImageLinkInput.value = null;
  openPopup(placePopup);
}


function renderCard (cardData, cardsContainer) {
  const card = new Card(cardData, '.card-template');
  const cardElement = card.createCard();
  cardsContainer.prepend(cardElement);
}


function submitHandlerProfileForm (evt) {
  evt.preventDefault();
  profileName.textContent = profileNameInput.value;
  profileInfo.textContent = profileAboutInput.value;
  closePopup(evt.target.closest('.popup'));
}


function submitHandlerPlaceForm (evt) {
  evt.preventDefault();
  const newCardData = {
    name: placeNameInput.value,
    link: placeImageLinkInput.value
  };
  renderCard(newCardData, cardsContainer);
  closePopup(evt.target.closest('.popup'));
}


class Card {
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


initialCards.forEach(cardData => {
  renderCard(cardData, cardsContainer);
});


popups.forEach((popup) => {
  popup.addEventListener('click', (evt) => {
    if (evt.target.classList.contains('popup__close-button') || evt.target.classList.contains('popup')) {
      closePopup(popup);
    }
  });
});


profileEditButton.addEventListener('click', openPopupProfile);
profileFormElement.addEventListener('submit', submitHandlerProfileForm);

placeAddButton.addEventListener('click', openPopupPlace);
placeFormElement.addEventListener('submit', submitHandlerPlaceForm);

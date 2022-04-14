import { FormValidator } from './FormValidator.js';
import { Card } from './Card.js';
import { openPopup, closePopup } from './utils.js';


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

const popups = Array.from(document.querySelectorAll('.popup'));

const validationSettings = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__submit-button',
  inactiveButtonClass: 'popup__submit-button_disabled',
  inputErrorClass: 'popup__input_type_error',
  messageErrorClass: 'popup__error-message_visible'
};

const formList = Array.from(document.querySelectorAll(validationSettings.formSelector));
const formValidators = {};


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


function renderCard (cardData, cardsContainer) {
  const card = new Card(cardData, '.card-template');
  const cardElement = card.createCard();
  cardsContainer.prepend(cardElement);
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


formList.forEach((formElement) => {
  const formValidator = new FormValidator(validationSettings, formElement);
  formValidators[formElement.name] = formValidator;
  formValidator.enableValidation();
});

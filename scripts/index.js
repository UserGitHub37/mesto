import FormValidator from './FormValidator.js';
import Card from './Card.js';
import { initialCards } from './initialCards.js';
import Section from './Section.js';
import PopupWithImage from './PopupWithImage.js';
import PopupWithForm from './PopupWithForm.js';
import UserInfo from './UserInfo.js';


const profile = document.querySelector('.profile');
const profileEditButton = profile.querySelector('.profile__edit-button');

const profilePopup = document.querySelector('.popup_profile');
const profileFormElement = profilePopup.querySelector('.popup__form');
const profileNameInput = profileFormElement.querySelector('.popup__input_field_name-profile');
const profileAboutInput = profileFormElement.querySelector('.popup__input_field_about-profile');

const placeAddButton = profile.querySelector('.profile__add-button');


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


const popupWithProfileForm = new PopupWithForm('.popup_profile', submitHandlerProfileForm);
popupWithProfileForm.setEventListeners();

const popupWithPlaceForm = new PopupWithForm('.popup_place', submitHandlerPlaceForm);
popupWithPlaceForm.setEventListeners();

const popupWithImage = new PopupWithImage('.popup_image');
popupWithImage.setEventListeners();


const userInfo = new UserInfo({
  nameSelector: '.profile__name',
  infoSelector: '.profile__info'
});


const cardsList = new Section({
  items: initialCards,
  renderer
}, '.elements__wrapper');


function renderer (item) {
  const card = new Card({
    cardData: item,
    handleCardClick
  }, '.card-template');
  const cardElement = card.createCard();
  cardsList.addItem(cardElement);
}


function handleCardClick (name, link) {
  popupWithImage.open(name, link);
}


function openPopupProfile () {
  formValidators.popupFormProfile.disableButton();
  const infoData = userInfo.getUserInfo();
  profileNameInput.value = infoData.name;
  profileAboutInput.value = infoData.info;
  formValidators.popupFormProfile.resetErrors();
  popupWithProfileForm.open();
}


function openPopupPlace () {
  formValidators.popupFormPlace.disableButton();
  formValidators.popupFormPlace.resetErrors();
  popupWithPlaceForm.open();
}


function submitHandlerProfileForm (evt, {userName: name, aboutUser: info}) {
  evt.preventDefault();
  userInfo.setUserInfo({ name, info });
  popupWithProfileForm.close();
}


function submitHandlerPlaceForm (evt, {placeName: name, placeImageLink: link}) {
  evt.preventDefault();
  cardsList.rendererItem({name, link});
  popupWithPlaceForm.close();
  formValidators.popupFormPlace.disableButton();
}

cardsList.renderInitialItems();

profileEditButton.addEventListener('click', openPopupProfile);

placeAddButton.addEventListener('click', openPopupPlace);


formList.forEach((formElement) => {
  const formValidator = new FormValidator(validationSettings, formElement);
  formValidators[formElement.name] = formValidator;
  formValidator.enableValidation();
});

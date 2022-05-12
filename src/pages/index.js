import './index.css';
import FormValidator from '../components/FormValidator.js';
import Card from '../components/Card.js';
import { initialCards } from '../utils/initialCards.js';
import Section from '../components/Section.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import UserInfo from '../components/UserInfo.js';
import { validationSettings } from '../utils/validationSettings.js';
import { profileEditButton, placeAddButton, profileNameInput, profileAboutInput } from '../utils/constants.js';
import PopupWithConfirmation from '../components/PopupWithConfirmation.js';


const formList = Array.from(document.querySelectorAll(validationSettings.formSelector));
const formValidators = {};


const popupWithProfileForm = new PopupWithForm('.popup_profile', submitHandlerProfileForm);
popupWithProfileForm.setEventListeners();

const popupWithPlaceForm = new PopupWithForm('.popup_place', submitHandlerPlaceForm);
popupWithPlaceForm.setEventListeners();

const popupWithImage = new PopupWithImage('.popup_image');
popupWithImage.setEventListeners();

const PopupWithDeleteCard = new PopupWithConfirmation('.popup_confirmation', submitHandlerDeleteCard);
PopupWithDeleteCard.setEventListeners();


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
  return card;
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

function openPopupDeleteCard () {
  PopupWithDeleteCard.open();
}

openPopupDeleteCard();


function submitHandlerProfileForm (evt, {userName: name, aboutUser: info}) {
  evt.preventDefault();
  userInfo.setUserInfo({ name, info });
  popupWithProfileForm.close();
}


function submitHandlerPlaceForm (evt, {placeName: name, placeImageLink: link}) {
  evt.preventDefault();
  const card = cardsList.rendererItem({name, link});
  cardsList.addItem(card.createCard());
  popupWithPlaceForm.close();
  formValidators.popupFormPlace.disableButton();
}


function submitHandlerDeleteCard (evt) {
  evt.preventDefault();
  console.log("Меня удалили");
}


cardsList.renderInitialItems().forEach(card => {
  cardsList.addItem(card.createCard());
});


profileEditButton.addEventListener('click', openPopupProfile);

placeAddButton.addEventListener('click', openPopupPlace);


formList.forEach((formElement) => {
  const formValidator = new FormValidator(validationSettings, formElement);
  formValidators[formElement.name] = formValidator;
  formValidator.enableValidation();
});

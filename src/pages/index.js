import './index.css';
import FormValidator from '../components/FormValidator.js';
import Card from '../components/Card.js';
import Section from '../components/Section.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import UserInfo from '../components/UserInfo.js';
import { validationSettings } from '../utils/validationSettings.js';

import {
  profileImageEditButton,
  profileEditButton,
  placeAddButton,
  profileNameInput,
  profileAboutInput
} from '../utils/constants.js';

import PopupWithConfirmation from '../components/PopupWithConfirmation.js';
import Api from '../components/Api.js';


const api = new Api({
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-41/',
  headers: {
    authorization: '7a2dc15d-d1bf-4fc7-a20c-343b3e4fd575',
    'Content-Type': 'application/json',
  }
});

const userInfo = new UserInfo({
  nameSelector: '.profile__name',
  infoSelector: '.profile__info',
  avatarSelector: '.profile__image'
});

const popupWithProfileImageForm = new PopupWithForm('.popup_image-profile', submitHandlerProfileImageForm);
const popupWithProfileForm = new PopupWithForm('.popup_profile', submitHandlerProfileForm);
const popupWithImage = new PopupWithImage('.popup_image');
const popupWithDeleteCard = new PopupWithConfirmation('.popup_confirmation', submitHandlerDeleteCard);

const formList = Array.from(document.querySelectorAll(validationSettings.formSelector));
const formValidators = {};


function openPopupProfileImage () {
  formValidators.popupFormProfileImage.disableButton();
  formValidators.popupFormProfileImage.resetErrors();
  popupWithProfileImageForm.open();
}


function submitHandlerProfileImageForm (evt, {profileImageLink}) {
  evt.preventDefault();
  popupWithProfileImageForm.renderLoading(true);
  api.changeAvatar({avatar: profileImageLink})
    .then(data => {
      userInfo.setUserAvatar(data.avatar);
      popupWithProfileImageForm.close();
    })
    .catch(err => console.log(err))
    .finally(() => {
      popupWithProfileImageForm.renderLoading(false);
    });
}


function openPopupProfile () {
  formValidators.popupFormProfile.disableButton();
  const infoData = userInfo.getUserInfo();
  profileNameInput.value = infoData.name;
  profileAboutInput.value = infoData.info;
  formValidators.popupFormProfile.resetErrors();
  popupWithProfileForm.open();
}


function submitHandlerProfileForm (evt, {userName: name, aboutUser: about}) {
  evt.preventDefault();
  popupWithProfileForm.renderLoading(true);
  api.changeUserInfo({ name, about })
    .then(({ name, about }) => {
      userInfo.setUserInfo({ name, about });
      popupWithProfileForm.close();
    })
    .catch(err => console.log(err))
    .finally(() => {
      popupWithProfileForm.renderLoading(false);
    });
}


function renderer (cardData) {
  const card = new Card({
    cardData,
    userId: userInfo.getUserId(),
    handleCardClick,
    handleLikeClick,
    handleDeleteIconClick
  }, '.card-template');
  return card;
}


function handleDeleteIconClick (cardData) {
  popupWithDeleteCard.open(cardData);
}


function submitHandlerDeleteCard (evt, cardData) {
  evt.preventDefault();
  api.deleteCard(cardData.cardId)
  .then(() => {
    cardData.cardElement.remove();
    cardData.cardElement = null;
    popupWithDeleteCard.close();
  })
  .catch(err => console.log(err));
}


function handleCardClick (name, link) {
  popupWithImage.open(name, link);
}


function handleLikeClick (card, isLike) {
  const cardPromise = isLike ? api.removeLike(card.cardId) : api.setLike(card.cardId);
  cardPromise.then((cardData) => {
    card.updateLike(cardData.likes);
    })
    .catch(err => console.log(err));
}


popupWithProfileImageForm.setEventListeners();
popupWithProfileForm.setEventListeners();
popupWithImage.setEventListeners();
popupWithDeleteCard.setEventListeners();



Promise.all([api.getUserInfo(), api.getInitialCards()])
  .then(([userData, initialCards]) => {
    userInfo.setUserAvatar(userData.avatar);
    userInfo.setUserId(userData._id);
    userInfo.setUserInfo({
      name: userData.name,
      about: userData.about
    });

    return new Section({
      items: initialCards,
      renderer
    }, '.elements__wrapper');

  })
  .then(cardsListSection => {
    const popupWithPlaceForm = new PopupWithForm('.popup_place', submitHandlerPlaceForm);
    popupWithPlaceForm.setEventListeners();

    function openPopupPlace () {
      formValidators.popupFormPlace.disableButton();
      formValidators.popupFormPlace.resetErrors();
      popupWithPlaceForm.open();
    }

    function submitHandlerPlaceForm (evt, {placeName: name, placeImageLink: link}) {
      evt.preventDefault();
      popupWithPlaceForm.renderLoading(true);
      api.addCard({name, link})
        .then(cardData => {
          const card = cardsListSection.rendererItem(cardData);
          cardsListSection.addItem(card.createCard());
          popupWithPlaceForm.close();
        })
        .catch(err => console.log(err))
        .finally(() => {
          popupWithPlaceForm.renderLoading(false);
          formValidators.popupFormPlace.disableButton();
        });

    }

    cardsListSection.renderInitialItems().forEach(card => {
      cardsListSection.addItem(card.createCard());
    });

    placeAddButton.addEventListener('click', openPopupPlace);

  })
  .catch(err => console.log(err));


profileEditButton.addEventListener('click', openPopupProfile);
profileImageEditButton.addEventListener('click', openPopupProfileImage);


formList.forEach((formElement) => {
  const formValidator = new FormValidator(validationSettings, formElement);
  formValidators[formElement.name] = formValidator;
  formValidator.enableValidation();
});

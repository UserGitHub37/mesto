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
const profilePopupBtnClose = profilePopup.querySelector('.popup__close-button');
const profileFormElement = profilePopup.querySelector('.popup__form');
const profileNameInput = profileFormElement.querySelector('.popup__input_field_name-profile');
const profileAboutInput = profileFormElement.querySelector('.popup__input_field_about-profile');


const placeAddButton = profile.querySelector('.profile__add-button');
const placePopup = document.querySelector('.popup_place');
const placePopupBtnClose = placePopup.querySelector('.popup__close-button');

const placeFormElement = placePopup.querySelector('.popup__form');
const placeNameInput = placeFormElement.querySelector('.popup__input_field_name-place');
const placeImageLinkInput = placeFormElement.querySelector('.popup__input_field_link-place');


function openPopupProfile () {
  profilePopup.classList.add('popup_opened');
  profileNameInput.value = profileName.textContent;
  profileAboutInput.value = profileInfo.textContent;
}

function closePopupProfile () {
  profilePopup.classList.remove('popup_opened');
}

function formSubmitHandlerProfile (evt) {
  evt.preventDefault();
  profileName.textContent = profileNameInput.value;
  profileInfo.textContent = profileAboutInput.value;
  closePopupProfile();
}

profileEditButton.addEventListener('click', openPopupProfile);
profilePopupBtnClose.addEventListener('click', closePopupProfile);
profileFormElement.addEventListener('submit', formSubmitHandlerProfile);


function openPopupPlace () {
  placeNameInput.value = null;
  placeImageLinkInput.value = null;
  placePopup.classList.add('popup_opened');
}

function closePopupPlace () {
  placePopup.classList.remove('popup_opened');
}

function formSubmitHandlerPlace (evt) {
  evt.preventDefault();
  const newCardData = {
    name: placeNameInput.value,
    link: placeImageLinkInput.value
  };
  renderCard(newCardData, cardsContainer);
  closePopupPlace();
}

placeAddButton.addEventListener('click', openPopupPlace);
placePopupBtnClose.addEventListener('click', closePopupPlace);
placeFormElement.addEventListener('submit', formSubmitHandlerPlace);


const imagePopup = document.querySelector('.popup_image');
const imagePopupBtnClose = imagePopup.querySelector('.popup__close-button');





function toggleLike (evt) {
  evt.target.classList.toggle('card__heart_active');
  console.log(evt.target);
}

function removeCard (evt) {
  evt.target.closest('.card').remove();
}

function createCard (data) {
  const cardElement = document
    .querySelector('.card-template')
    .content.firstElementChild.cloneNode(true);

  const cardHeart = cardElement.querySelector('.card__heart');
  const cardRemoveButton = cardElement.querySelector('.card__remove-button');

  cardElement.querySelector('.card__title').textContent = data.name;
  cardElement.querySelector('.card__image').src = data.link;
  cardElement.querySelector('.card__image').alt = data.name;

  cardHeart.addEventListener('click', toggleLike);
  cardRemoveButton.addEventListener('click', removeCard);
// навесить обработчик событий на открытие картинки

  return cardElement;
}


function renderCard (data, cardsContainer) {
  const cardElement = createCard(data);
  cardsContainer.prepend(cardElement);
}

initialCards.forEach(cardData => { renderCard(cardData, cardsContainer); });

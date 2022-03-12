let popup = document.querySelector('.popup');
let closeButton = popup.querySelector('.popup__close-button');

let formElement = document.querySelector('.popup__form');
let nameInput = formElement.querySelector('.popup__input_field_name');
let aboutInput = formElement.querySelector('.popup__input_field_about');

let profile = document.querySelector('.profile');
let profileName = profile.querySelector('.profile__name');
let profileInfo = profile.querySelector('.profile__info');

let editButton = profile.querySelector('.profile__edit-button');

function openPopup () {
  popup.classList.add('popup_opened');
  nameInput.value = profileName.textContent;
  aboutInput.value = profileInfo.textContent;
}

function closePopup () {
  popup.classList.remove('popup_opened');
}

function formSubmitHandler (evt) {
  evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.
  profileName.textContent = nameInput.value;
  profileInfo.textContent = aboutInput.value;
  closePopup();
}

editButton.addEventListener('click', openPopup);

formElement.addEventListener('submit', formSubmitHandler);

closeButton.addEventListener('click', closePopup);


const popupProfile = document.querySelector('.popup_profile');
const popupPlace = document.querySelector('.popup_place');
const popupImage = document.querySelector('.popup_image');

const popupProfileClose = popupProfile.querySelector('.popup__close-button');
const popupPlaceClose = popupPlace.querySelector('.popup__close-button');
const popupImageClose = popupImage.querySelector('.popup__close-button');

console.log({popupProfile, popupPlace, popupImage, popupProfileClose, popupPlaceClose, popupImageClose});

/* const togglePopup = function (popup) {
  popup.classList.toggle('popup_opened');
}; */

const toggleLike = function (evt) {
  evt.target.classList.toggle('card__heart_active');
  console.log(evt.target);
};

const removeCard = function (evt) {
  evt.target.closest('.card').remove();
};


const createCard = (data) => {
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
};


const renderCard = (data, cardsContainer) => {
  const cardElement = createCard(data);
  cardsContainer.prepend(cardElement);
};


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

initialCards.forEach(card => { renderCard(card, cardsContainer); });

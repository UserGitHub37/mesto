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

const imagePopup = document.querySelector('.popup_image');
const imagePopupBtnClose = imagePopup.querySelector('.popup__close-button');


function openPopup (popup) {
  popup.classList.add('popup_opened');
}


function openPopupProfile () {
  openPopup(profilePopup);
  profileNameInput.value = profileName.textContent;
  profileAboutInput.value = profileInfo.textContent;
}


function openPopupPlace () {
  placeNameInput.value = null;
  placeImageLinkInput.value = null;
  openPopup(placePopup);
}


function openPopupImage (evt) {
  const enlargedImage = imagePopup.querySelector('.popup__enlarged-image');
  const imagePopupTitle = imagePopup.querySelector('.popup__title_type_image');
  openPopup(imagePopup);
  enlargedImage.src = evt.target.src;
  imagePopupTitle.textContent = evt.target.parentElement.querySelector('.card__title').textContent;
}


function toggleLike (evt) {
  evt.target.classList.toggle('card__heart_active');
}


function removeCard (evt) {
  evt.target.closest('.card').remove();
}


function closePopup (evt) {
  evt.target.closest('.popup').classList.remove('popup_opened');
}


function createCard (data) {
  const cardElement = document
    .querySelector('.card-template')
    .content.firstElementChild.cloneNode(true);

  const cardTitle = cardElement.querySelector('.card__title');
  const cardImage = cardElement.querySelector('.card__image');
  const cardRemoveButton = cardElement.querySelector('.card__remove-button');
  const cardHeart = cardElement.querySelector('.card__heart');

  cardTitle.textContent = data.name;
  cardImage.src = data.link;
  cardImage.alt = data.name;

  cardImage.addEventListener('click', openPopupImage);
  cardRemoveButton.addEventListener('click', removeCard);
  cardHeart.addEventListener('click', toggleLike);

  return cardElement;
}


function renderCard (data, cardsContainer) {
  const cardElement = createCard(data);
  cardsContainer.prepend(cardElement);
}


function submitHandlerProfileForm (evt) {
  evt.preventDefault();
  profileName.textContent = profileNameInput.value;
  profileInfo.textContent = profileAboutInput.value;
  closePopup(evt);
}


function submitHandlerPlaceForm (evt) {
  evt.preventDefault();
  const newCardData = {
    name: placeNameInput.value,
    link: placeImageLinkInput.value
  };
  renderCard(newCardData, cardsContainer);
  closePopup(evt);
}


initialCards.forEach(cardData => { renderCard(cardData, cardsContainer); });


profileEditButton.addEventListener('click', openPopupProfile);
profilePopupBtnClose.addEventListener('click', closePopup);
profileFormElement.addEventListener('submit', submitHandlerProfileForm);

placeAddButton.addEventListener('click', openPopupPlace);
placePopupBtnClose.addEventListener('click', closePopup);
placeFormElement.addEventListener('submit', submitHandlerPlaceForm);

imagePopupBtnClose.addEventListener('click', closePopup);

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

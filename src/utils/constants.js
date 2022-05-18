const profile = document.querySelector('.profile');
const profileImageEditButton = profile.querySelector('.profile__image-edit-button');
const profileEditButton = profile.querySelector('.profile__edit-button');
const placeAddButton = profile.querySelector('.profile__add-button');

const profilePopup = document.querySelector('.popup_profile');
const profileFormElement = profilePopup.querySelector('.popup__form');
const profileNameInput = profileFormElement.querySelector('.popup__input_field_name-profile');
const profileAboutInput = profileFormElement.querySelector('.popup__input_field_about-profile');


export { profileImageEditButton, profileEditButton, placeAddButton, profileNameInput, profileAboutInput };

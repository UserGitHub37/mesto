export const imagePopup = document.querySelector('.popup_image');
export const enlargedImage = imagePopup.querySelector('.popup__enlarged-image');
export const imagePopupTitle = imagePopup.querySelector('.popup__title_type_image');


function handleEscUp (evt) {
  if (evt.key === "Escape") {
    const activePopup = document.querySelector('.popup_opened');
    closePopup(activePopup);
  }
}


export function openPopup (popup) {
  popup.classList.add('popup_opened');
  document.addEventListener('keydown', handleEscUp);
}


export function closePopup (popup) {
  document.removeEventListener('keydown', handleEscUp);
  popup.classList.remove('popup_opened');
}

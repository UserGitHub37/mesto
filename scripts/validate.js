
function hideInputError(formElement, inputElement, {inputErrorClass, messageErrorClass}) {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.remove(inputErrorClass);
  errorElement.classList.remove(messageErrorClass);
  errorElement.textContent = '';
}


function showInputError(formElement, inputElement, errorMessage, {inputErrorClass, messageErrorClass}) {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.add(inputErrorClass);
  errorElement.textContent = errorMessage;
  errorElement.classList.add(messageErrorClass);
}


function checkInputValidity(formElement, inputElement, {...rest}) {
  if (inputElement.validity.valid) {
    hideInputError(formElement, inputElement, rest);
  } else {
    showInputError(formElement, inputElement, inputElement.validationMessage, rest);
  }
}


function setEventListeners(formElement, {inputSelector, submitButtonSelector, inactiveButtonClass, ...rest}) {
  const inputList = Array.from(formElement.querySelectorAll(inputSelector));
  const buttonElement = formElement.querySelector(submitButtonSelector);
  toggleButtonState(inputList, buttonElement, inactiveButtonClass);
  inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', function () {
      checkInputValidity(formElement, inputElement, rest);
      toggleButtonState(inputList, buttonElement, inactiveButtonClass);
    });
  });
}


function enableValidation({formSelector, ...rest}) {
  const formList = Array.from(document.querySelectorAll(formSelector));
  formList.forEach((formElement) => {
    formElement.addEventListener('submit', function (evt) {
      evt.preventDefault();
    });
    setEventListeners(formElement, rest);
  });
}


function hasInvalidInput(inputList) {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  });
}


function toggleButtonState(inputList, buttonElement, inactiveButtonClass) {
  if (hasInvalidInput(inputList)) {
    buttonElement.classList.add(inactiveButtonClass);
  } else {
    buttonElement.classList.remove(inactiveButtonClass);
  }
}


enableValidation({
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__submit-button',
  inactiveButtonClass: 'popup__submit-button_disabled',
  inputErrorClass: 'popup__input_type_error',
  messageErrorClass: 'popup__error-message_visible'
});


/*
  formSelector: '.popup__form',                   // селектор формы
  inputSelector: '.popup__input',                 // селектор инпутов внутри этой формы
  submitButtonSelector: '.popup__submit-button',         // селектор кнопки сабмита этой формы
  inactiveButtonClass: 'popup__submit-button_disabled',  // класс модификатор для дизэйбла кнопки
  inputErrorClass: 'popup__input_type_error', //класс модификатор для инпутовю. Красное подчеркивание?!
  errorClass: 'popup__error-message_visible'              // селектор контейнеров для ошибок этой формы
 */

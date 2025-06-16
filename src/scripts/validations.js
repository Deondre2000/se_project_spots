const settings = {
  formSelector: ".modal__form",
  inputSelector: ".modal__input",
  submitButtonSelector: ".modal__submit-button",
  inactiveButtonClass: "modal__submit-button-disabled",
  inputErrorClass: "modal__input_type_error",
  errorClass: "modal__error",
};

const showInputError = (formEl, inputEl, errorMsg, settings) => {
  const errorMsgID = inputEl.id + "-error";
  const errorMsgEl = formEl.querySelector("#" + errorMsgID);
  errorMsgEl.textContent = errorMsg;
  inputEl.classList.add(settings.inputErrorClass);
};

const hideInputError = (formEl, inputEl, settings) => {
  const errorMsgID = inputEl.id + "-error";
  const errorMsgEl = formEl.querySelector("#" + errorMsgID);
  errorMsgEl.textContent = "";
  inputEl.classList.remove(settings.inputErrorClass);
};

const checkInputValidity = (formEl, inputEl, settings) => {
  if (!inputEl.validity.valid) {
    showInputError(formEl, inputEl, inputEl.validationMessage, settings);
  } else {
    hideInputError(formEl, inputEl, settings);
  }
};
const hasInvalidInput = (inputList) => {
  return inputList.some((input) => {
    return !input.validity.valid;
  });
};

const toggleButtonState = (inputList, buttonEl, settings) => {
  if (hasInvalidInput(inputList)) {
    disabledButton(buttonEl, settings);
  } else {
    buttonEl.disabled = false;
    buttonEl.classList.remove(settings.inactiveButtonClass);
  }
};

const disabledButton = (buttonEl, settings) => {
  buttonEl.disabled = true;
  buttonEl.classList.add(settings.inactiveButtonClass);
};

const resetValidation = (formEl, inputList) => {
  inputList.forEach((input) => {
    hideInputError(formEl, input, settings);
  });
};

const setEventListners = (formEl, settings) => {
  const inputList = Array.from(formEl.querySelectorAll(settings.inputSelector));
  const buttonElement = formEl.querySelector(settings.submitButtonSelector);

  toggleButtonState(inputList, buttonElement, settings);

  inputList.forEach((inputElement) => {
    inputElement.addEventListener("input", function () {
      checkInputValidity(formEl, inputElement, settings);
      toggleButtonState(inputList, buttonElement, settings);
    });
  });
};
const enableValidation = (settings) => {
  const formList = document.querySelectorAll(settings.formSelector);
  formList.forEach((formEl) => {
    setEventListners(formEl, settings);
  });
};

enableValidation(settings);

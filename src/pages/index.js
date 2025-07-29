import "../pages/index.css";
import Api from "../utils/Api.js";
import { resetValidation, disabledButton } from "../scripts/validations.js";
import { settings } from "../scripts/validations.js";
import {
  setButtonText,
  setDeleteText,
  setCancelText,
} from "../utils/helpers.js";
const initialCards = [
  {
    name: "Val Thorens",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/1-photo-by-moritz-feldmann-from-pexels.jpg",
  },
  {
    name: "Restaurant terrace",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/2-photo-by-ceiline-from-pexels.jpg",
  },
  {
    name: "An outdoor cafe",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/3-photo-by-tubanur-dogan-from-pexels.jpg",
  },
  {
    name: "A very long bridge, over the forest and through the trees",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/4-photo-by-maurice-laschet-from-pexels.jpg",
  },
  {
    name: "Tunnel with morning light",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/5-photo-by-van-anh-nguyen-from-pexels.jpg",
  },
  {
    name: "Mountain house",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/6-photo-by-moritz-feldmann-from-pexels.jpg",
  },
  {
    name: "Golden Gate bridge",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/7-photo-by-griffin-wooldridge-from-pexels.jpg",
  },
];

console.log(initialCards);

const api = new Api({
  baseUrl: "https://around-api.en.tripleten-services.com/v1",
  headers: {
    authorization: "2b691c5a-4104-47de-96f0-e920839082f4",
    "Content-Type": "application/json",
  },
});

function displayUserInfo(info) {
  profileName.textContent = info.name;
  profileDescription.textContent = info.about;
  if (profileAvatar) {
    profileAvatar.src = info.avatar;
    profileAvatar.alt = info.name;
  }
}

api
  .getAppInfo()
  // desteructor get user info in here
  .then(([cards, info]) => {
    displayUserInfo(info);
    cards.forEach((item) => {
      const cardElement = getcardElement(item);
      cardsList.prepend(cardElement);
    });
  })
  .catch(console.error);

// Profile elements
const profileEditButton = document.querySelector(".profile__edit-btn");
const cardModalBtn = document.querySelector(".profile__add-btn");
const avatarModalBtn = document.querySelector(".profile__avatar-btn");
const profileAvatar = document.querySelector(".profile__avatar");
const profileName = document.querySelector(".profile__name");
const profileDescription = document.querySelector(".profile__description");

// Form elements
const editModal = document.querySelector("#edit-modal");
const editFormElement = editModal.querySelector(".modal__form");
const editModalCloseButton = editModal.querySelector(".modal__close-button");
const editModalNameInput = editModal.querySelector("#profile-name-input");
const editModalDescriptionInput = editModal.querySelector(
  "#profile-description-input"
);

// Card form elements
const cardModal = document.querySelector("#add-card-modal");
const cardForm = cardModal.querySelector(".modal__form");
const cardSubmitBtn = cardModal.querySelector(".modal__submit-button");
const cardModalCloseBtn = cardModal.querySelector(".modal__close-button");

const cardLinkInput = cardModal.querySelector("#add-card-link-input");
const cardNameInput = cardModal.querySelector("#add-card-name-input");

// Avatar form elements
const avatarModal = document.querySelector("#avatar-modal");
const avatarForm = avatarModal.querySelector(".modal__form");
const avatarModalCloseBtn = avatarModal.querySelector(".modal__close-button");
const avatarNameInput = avatarModal.querySelector("#profile-avatar-input");

//Delete form elements
const deleteModal = document.querySelector("#delete-modal");
const deleteForm = deleteModal.querySelector(".modal__form-delete");
const cardDeleteBtn = deleteModal.querySelector(".modal__close-button-delete");
const cardCancelBtn = deleteModal.querySelector(".modal__submit-button-cancel");

// Preview image popup elements
const previewModal = document.querySelector("#preview-modal");
const previewModalImageEl = previewModal.querySelector(".modal__image");
const previewModalCaptionEl = previewModal.querySelector(".modal__caption");
const previewModalCloseBtn = previewModal.querySelector(
  ".modal__close-button_type_preview"
);

//card related elements
const cardTemplate = document.querySelector("#card-template");
const cardsList = document.querySelector(".cards__list");
const cardImage = document.querySelector(".card__image");

let selectedCard;
let selectedCardId;

function getcardElement(data) {
  console.log(data);
  const cardElement = cardTemplate.content
    .querySelector(".card")
    .cloneNode(true);

  const cardNameEl = cardElement.querySelector(".card__title");
  const cardImageEl = cardElement.querySelector(".card__image");
  const cardLikeBtn = cardElement.querySelector(".card__like-button");

  const cardDeleteBtn = cardElement.querySelector(".card__delete-button");
  let isLiked = data.isLiked;

  if (isLiked) {
    cardLikeBtn.classList.add("card__like-button_liked");
  }

  cardNameEl.textContent = data.name;
  cardImageEl.src = data.link;
  cardImageEl.alt = data.name;
  cardLikeBtn.addEventListener("click", (evt) => handleLike(evt, data._id));

  cardImageEl.addEventListener("click", () => {
    openModal(previewModal);
    previewModalImageEl.src = data.link;
    previewModalCaptionEl.textContent = data.name;
    previewModalImageEl.alt = data.name;
  });

  cardDeleteBtn.addEventListener("click", () =>
    handleDeleteCard(cardElement, data._id)
  );

  function handleLike(evt, cardId) {
    const isLiked = evt.target.classList.contains("card__like-button_liked");
    api
      .handleLike(cardId, isLiked)
      .then(() => {
        cardLikeBtn.classList.toggle("card__like-button_liked");
      })
      .catch(console.error);
  }

  function handleDeleteCard(cardElement, cardId) {
    openModal(deleteModal);
    selectedCard = cardElement;
    selectedCardId = cardId;
  }

  return cardElement;
}

function handleDeleteSubmit(evt) {
  evt.preventDefault();
  const cardDeleteBtn = evt.submitter;
  const cardCancelBtn = deleteForm.querySelector(
    ".modal__submit-button-cancel"
  );

  if (evt.submitter === cardDeleteBtn) {
    setDeleteText(cardDeleteBtn, true);
    api
      .deleteCard(selectedCardId)
      .then(() => {
        selectedCard.remove();
        closeModal(deleteModal);
      })
      .catch(console.error)
      .finally(() => {
        setDeleteText(cardDeleteBtn, false);
      });
  } else {
    closeModal(deleteModal);
  }
}
openModal;
function openModal(modal) {
  modal.classList.add("modal_opened");
  document.addEventListener("click", handleModalEvents);
  document.addEventListener("keydown", handleModalEvents);

}

function closeModal(modal) {
  modal.classList.remove("modal_opened");
  document.removeEventListener("click", handleModalEvents);
  document.removeEventListener("keydown", handleModalEvents);
}

function handleEditFormSubmit(evt) {
  evt.preventDefault();

  const submitBtn = evt.submitter;
  //submitBtn.textContent = "Saving...";
  setButtonText(submitBtn, true);

  api
    .editUserInfo({
      name: editModalNameInput.value,
      about: editModalDescriptionInput.value,
    })
    .then((data) => {
      //Use data argument instead of input values
      profileName.textContent = editModalNameInput.value;
      profileDescription.textContent = editModalDescriptionInput.value;
      closeModal(editModal);
    })
    .catch(console.error)
    .finally(() => {
      setButtonText(submitBtn, false);
      //submitBtn.textContent = "Save";
    });
}

function handleAvatarSubmit(evt) {
  evt.preventDefault();
  const submitBtn = evt.submitter;
  setButtonText(submitBtn, true);

  api
    .editAvatarInfo({
      avatar: avatarNameInput.value,
    })
    .then((data) => {
      profileAvatar.src = data.avatar;
      evt.target.reset();
      disabledButton(cardSubmitBtn, settings);
      closeModal(avatarModal);
    })
    .catch(console.error)
    .finally(() => {
      setButtonText(submitBtn, false);
    });
}

function handleAddCardSubmit(evt) {
  evt.preventDefault();
  const submitBtn = evt.submitter;
  setButtonText(submitBtn, true);
  api
    .addCardInfo({
      name: cardNameInput.value,
      link: cardLinkInput.value,
    })
    .then((data) => {
      const cardElement = getcardElement(data);
      cardsList.prepend(cardElement);
      evt.target.reset();
      disabledButton(cardSubmitBtn, settings);
      closeModal(cardModal);
    })
    .catch(console.error)
    .finally(() => {
      setButtonText(submitBtn, false);
    });
}

profileEditButton.addEventListener("click", () => {
  editModalDescriptionInput.value = profileDescription.textContent;
  editModalNameInput.value = profileName.textContent;
  resetValidation(editFormElement, [
    editModalNameInput,
    editModalDescriptionInput,
  ]);
  openModal(editModal);
});

editModalCloseButton.addEventListener("click", () => {
  closeModal(editModal);
});

previewModalCloseBtn.addEventListener("click", () => {
  closeModal(previewModal);
});

cardModalBtn.addEventListener("click", () => {
  openModal(cardModal);
});

avatarModalBtn.addEventListener("click", () => {
  openModal(avatarModal);
});

avatarModalCloseBtn.addEventListener("click", () => {
  closeModal(avatarModal);
});

cardModalCloseBtn.addEventListener("click", () => {
  closeModal(cardModal);
});

cardDeleteBtn.addEventListener("click", () => {
  closeModal(deleteModal);
});

cardCancelBtn.addEventListener("click", () => {
  closeModal(deleteModal);
});

deleteForm.addEventListener("submit", handleDeleteSubmit);

editFormElement.addEventListener("submit", handleEditFormSubmit);
cardForm.addEventListener("submit", handleAddCardSubmit);
avatarForm.addEventListener("submit", handleAvatarSubmit);

function handleModalEvents(evt) {
  const openModalElement = document.querySelector(".modal_opened");

  if (evt.type === "click" && evt.target === openModalElement) {
    closeModal(document.querySelector(".modal_opened"));
  } else if (
    evt.type === "keydown" &&
    evt.key === "Escape" &&
    openModalElement
  ) {
    closeModal(openModalElement);
  }
}

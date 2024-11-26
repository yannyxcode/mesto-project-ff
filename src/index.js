import './pages/index.css';
import { initialCards } from './scripts/cards';
import { createCard, removeCard } from './components/card';
import { openModal, closeModal } from './components/modal';

const placeList = document.querySelector('.places__list');

const editButton = document.querySelector('.profile__edit-button');
const addButton = document.querySelector('.profile__add-button');

const profileTitle = document.querySelector('.profile__title');
const profileDescription = document.querySelector('.profile__description');

// formElement переименована в profileFormElement для большей ясности
const profileFormElement = document.querySelector(
    '.popup__form[name="edit-profile"]'
);
const nameInput = profileFormElement.querySelector('.popup__input_type_name');
const jobInput = profileFormElement.querySelector(
    '.popup__input_type_description'
);

const newCardFormElement = document.querySelector(
    '.popup__form[name="new-place"]'
);
const cardNameInput = newCardFormElement.querySelector(
    '.popup__input_type_card-name'
);
const cardLinkInput = newCardFormElement.querySelector(
    '.popup__input_type_url'
);

const editPopup = document.querySelector('.popup_type_edit'); // добавила попап popup_type_edit в общую область видимости, устранила повторное определение
const newCardPopup = document.querySelector('.popup_type_new-card'); // добавила попап popup_type_new-card в общую область видимости, устранила повторное определение

const popups = document.querySelectorAll('.popup');

popups.forEach((popup) => {
    const closeButton = popup.querySelector('.popup__close');
    closeButton.addEventListener('click', () => {
        closeModal(popup);
    });
});

popups.forEach((popup) => {
    popup.addEventListener('mousedown', (evt) => {
        if (evt.target.classList.contains('popup')) {
            closeModal(popup);
        }
    });
});

function handleCardImageClick(cardData) {
    const imagePopup = document.querySelector('.popup_type_image');
    const popupImage = imagePopup.querySelector('.popup__image');
    const popupCaption = imagePopup.querySelector('.popup__caption');

    popupImage.src = cardData.link;
    popupImage.alt = cardData.name;
    popupCaption.textContent = cardData.name;

    openModal(imagePopup);
}

editButton.addEventListener('click', function () {
    nameInput.value = profileTitle.textContent;
    jobInput.value = profileDescription.textContent;

    openModal(editPopup);
});

addButton.addEventListener('click', function () {
    openModal(newCardPopup);
});

function renderInitialCards() {
    initialCards.forEach((cardData) => {
        const cardElement = createCard(
            cardData,
            removeCard,
            handleCardImageClick
        );
        placeList.append(cardElement);
    });
}

function handleProfileFormSubmit(evt) {
    evt.preventDefault();

    const newName = nameInput.value;
    const newJob = jobInput.value;

    profileTitle.textContent = newName;
    profileDescription.textContent = newJob;

    closeModal(editPopup);
}

newCardFormElement.addEventListener('submit', function (evt) {
    evt.preventDefault();

    const newCardData = {
        name: cardNameInput.value,
        link: cardLinkInput.value,
        alt: cardNameInput.value,
    };

    const newCardElement = createCard(
        newCardData,
        removeCard,
        handleCardImageClick
    );
    placeList.prepend(newCardElement);

    closeModal(newCardPopup);

    cardNameInput.value = '';
    cardLinkInput.value = '';
});

profileFormElement.addEventListener('submit', handleProfileFormSubmit);

renderInitialCards();

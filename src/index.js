import './pages/index.css';
import { initialCards } from './scripts/cards';
import { createCard, removeCard } from './components/card';
import { openModal, closeModal } from './components/modal';

const placeList = document.querySelector('.places__list');

const editButton = document.querySelector('.profile__edit-button');
const addButton = document.querySelector('.profile__add-button');
const cardImages = document.querySelectorAll('.card__image');

const formElement = document.querySelector('.popup__form[name="edit-profile"]');
const nameInput = formElement.querySelector('.popup__input_type_name');
const jobInput = formElement.querySelector('.popup__input_type_description');

const newCardFormElement = document.querySelector(
    '.popup__form[name="new-place"]'
);
const cardNameInput = newCardFormElement.querySelector(
    '.popup__input_type_card-name'
);
const cardLinkInput = newCardFormElement.querySelector(
    '.popup__input_type_url'
);

editButton.addEventListener('click', function () {
    const editPopup = document.querySelector('.popup_type_edit');
    const currentName = document.querySelector('.profile__title').textContent;
    const currentJob = document.querySelector(
        '.profile__description'
    ).textContent;

    nameInput.value = currentName;
    jobInput.value = currentJob;

    openModal(editPopup);
});

addButton.addEventListener('click', function () {
    const newCardPopup = document.querySelector('.popup_type_new-card');
    openModal(newCardPopup);
});

function renderInitialCards() {
    initialCards.forEach((cardData) => {
        const cardElement = createCard(cardData, removeCard);
        placeList.prepend(cardElement);
    });

    const cardImages = document.querySelectorAll('.card__image');

    cardImages.forEach((image) => {
        image.addEventListener('click', function () {
            const imagePopup = document.querySelector('.popup_type_image');
            const popupImage = imagePopup.querySelector('.popup__image');
            const popupCaption = imagePopup.querySelector('.popup__caption');

            popupImage.src = image.src;
            popupImage.alt = image.alt;
            popupCaption.textContent = image.alt;

            openModal(imagePopup);
        });
    });
}

function handleFormSubmit(evt) {
    evt.preventDefault();

    const newName = nameInput.value;
    const newJob = jobInput.value;

    const profileTitle = document.querySelector('.profile__title');
    const profileDescription = document.querySelector('.profile__description');

    profileTitle.textContent = newName;
    profileDescription.textContent = newJob;

    closeModal(document.querySelector('.popup_type_edit'));
}

newCardFormElement.addEventListener('submit', function (evt) {
    evt.preventDefault();

    const newCardData = {
        name: cardNameInput.value,
        link: cardLinkInput.value,
        alt: cardNameInput.value,
    };

    const newCardElement = createCard(newCardData, removeCard);
    placeList.prepend(newCardElement);

    const newCardImage = newCardElement.querySelector('.card__image');
    newCardImage.addEventListener('click', function () {
        const imagePopup = document.querySelector('.popup_type_image');
        const popupImage = imagePopup.querySelector('.popup__image');
        const popupCaption = imagePopup.querySelector('.popup__caption');

        popupImage.src = newCardImage.src;
        popupImage.alt = newCardImage.alt;
        popupCaption.textContent = newCardImage.alt;

        openModal(imagePopup);
    });

    console.log(initialCards);

    closeModal(document.querySelector('.popup_type_new-card'));

    cardNameInput.value = '';
    cardLinkInput.value = '';
});

formElement.addEventListener('submit', handleFormSubmit);

renderInitialCards();

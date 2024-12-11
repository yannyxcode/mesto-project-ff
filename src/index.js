// Здравствуйте, сможете пожалуйста подробно описать, что нужно исправить и почему,
// чтобы я сразу разобралась в этой теме и мне было более понятно увидеть на практике
// как лучше и почему, заранее благодарю за ревью,
// С Наступающим Новым Годом!

import './pages/index.css';
import { removeCard, cardLike, renderCard } from './components/card';
import { openModal, closeModal } from './components/modal';

import {
    updateAvatar,
    getInitialInfo,
    postCard,
    updateProfileUser,
} from './scripts/api';

import { clearValidation, enableValidation } from './scripts/validation';

const placeList = document.querySelector('.places__list');

const profileTitle = document.querySelector('.profile__title');
const profileAvatar = document.querySelector('.profile__image');
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
const editAvatarFormElement = document.querySelector(
    '.popup__form[name="edit-avatar"]'
);

const editPopup = document.querySelector('.popup_type_edit'); // добавила попап popup_type_edit в общую область видимости, устранила повторное определение
const newCardPopup = document.querySelector('.popup_type_new-card'); // добавила попап popup_type_new-card в общую область видимости, устранила повторное определение
const avatarPopup = document.querySelector('.popup_type_avatar'); // добавила попап popup_type_avatar в общую область видимости
const imagePopup = document.querySelector('.popup_type_image');

const popupImage = imagePopup.querySelector('.popup__image');
const popupCaption = imagePopup.querySelector('.popup__caption');

const editButton = document.querySelector('.profile__edit-button');
const addButton = document.querySelector('.profile__add-button');
const avatarButton = document.querySelector('.profile__image-overlay');

const popups = document.querySelectorAll('.popup');

let userId;
// вызов функции включения валидации
const validationConfig = {
    formSelector: '.popup__form',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__button',
    inactiveButtonClass: 'popup__button_disabled',
    inputErrorClass: 'popup__input_type_error',
    errorClass: 'popup__error_visible',
};

popups.forEach((popup) => {
    const closeButton = popup.querySelector('.popup__close');
    closeButton.addEventListener('click', () => {
        closeModal(popup);

        clearValidation(profileFormElement, validationConfig);
    });
});

popups.forEach((popup) => {
    popup.addEventListener('mousedown', (e) => {
        if (e.target.classList.contains('popup')) {
            closeModal(popup);

            clearValidation(profileFormElement, validationConfig);
        }
    });
});

// функция рендера загрузки
function renderLoading(isLoading, button) {
    button.textContent = isLoading ? 'Сохранение...' : 'Сохранить';
}

function fillProfileInfo(userInfo) {
    profileTitle.textContent = userInfo.name;
    profileDescription.textContent = userInfo.about;
    profileAvatar.style.backgroundImage = `url(${userInfo.avatar})`;
}

editButton.addEventListener('click', function () {
    nameInput.value = profileTitle.textContent;
    jobInput.value = profileDescription.textContent;

    clearValidation(profileFormElement, validationConfig);

    openModal(editPopup);
});

addButton.addEventListener('click', function () {
    clearValidation(newCardFormElement, validationConfig);

    openModal(newCardPopup);
});

avatarButton.addEventListener('click', function () {
    clearValidation(editAvatarFormElement, validationConfig);
    editAvatarFormElement.reset();

    openModal(avatarPopup);
});

const renderInitialCards = (initialCards, userId) => {
    initialCards.forEach((card) => {
        renderCard(
            card,
            userId,
            placeList,
            cardLike,
            removeCard,
            openImagePopup
        );
    });
};

function openImagePopup(imgUrl, imgAlt, imgTitle) {
    popupImage.src = imgUrl;
    popupImage.alt = imgAlt;
    popupCaption.textContent = imgTitle;

    openModal(imagePopup);
}

function handleProfileFormSubmit(e) {
    e.preventDefault();

    const newName = nameInput.value;
    const newJob = jobInput.value;

    renderLoading(true, profileFormElement.querySelector('.popup__button'));

    updateProfileUser({ name: newName, about: newJob })
        .then((updatedProfile) => {
            profileTitle.textContent = updatedProfile.name;
            profileDescription.textContent = updatedProfile.about;
            closeModal(editPopup);
        })
        .catch((err) => {
            console.log(err);
        })
        .finally(() => {
            renderLoading(
                false,
                profileFormElement.querySelector('.popup__button')
            );
            clearValidation(profileFormElement, validationConfig);
        });
}

function handleAvatarFormSubmit(e) {
    e.preventDefault();

    renderLoading(true, editAvatarFormElement.querySelector('.popup__button'));
    updateAvatar(editAvatarFormElement.link.value)
        .then((updatedProfile) => {
            fillProfileInfo(updatedProfile);
            closeModal(avatarPopup);
            clearValidation(editAvatarFormElement, validationConfig);
        })
        .catch((err) => {
            console.log(err);
        })
        .finally(() => {
            renderLoading(
                false,
                editAvatarFormElement.querySelector('.popup__button')
            );
        });
}

const handleNewCardFormSubmit = async (e) => {
    e.preventDefault();
    renderLoading(true, newCardFormElement.querySelector('.popup__button'));

    const name = newCardFormElement.elements['place-name'].value;
    const link = newCardFormElement.elements.link.value;
    postCard({ name, link })
        .then((newCard) => {
            renderCard(
                newCard,
                userId,
                placeList,
                cardLike,
                removeCard,
                openImagePopup,
                true
            );

            closeModal(newCardPopup);
            newCardFormElement.reset();
            clearValidation(newCardFormElement, validationConfig);
        })
        .catch((err) => {
            console.log(err);
        })
        .finally(() => {
            renderLoading(
                false,
                newCardFormElement.querySelector('.popup__button')
            );
        });
};

newCardPopup.addEventListener('submit', handleNewCardFormSubmit);

profileFormElement.addEventListener('submit', handleProfileFormSubmit);
editAvatarFormElement.addEventListener('submit', handleAvatarFormSubmit);

getInitialInfo()
    .then((result) => {
        const userInfo = result[0];
        userId = userInfo._id;
        const initialCards = result[1];
        fillProfileInfo(userInfo);
        renderInitialCards(initialCards, userId);
    })
    .catch((err) => {
        console.log(err);
    });

enableValidation(validationConfig);

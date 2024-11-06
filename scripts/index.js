// @todo: Темплейт карточки

// @todo: DOM узлы

// @todo: Функция создания карточки

// @todo: Функция удаления карточки

// @todo: Вывести карточки на страницу

const cardTemplate = document.querySelector('#card-template').content;
const placeList = document.querySelector('.places__list');

function createCard(cardData, handleDelete) {
    const cardItemCopy = cardTemplate.querySelector('.card').cloneNode(true);
    cardItemCopy.querySelector('.card__image').src = cardData.link;
    cardItemCopy.querySelector('.card__image').alt = cardData.name;
    cardItemCopy.querySelector('.card__title').textContent = cardData.name;

    cardItemCopy
        .querySelector('.card__delete-button')
        .addEventListener('click', function (e) {
            handleDelete(e);
        });

    return cardItemCopy;
}

function renderInitialCards() {
    initialCards.forEach((cardData) => {
        const cardElement = createCard(cardData, function (e) {
            e.target.closest('.card').remove();
        });
        placeList.prepend(cardElement);
    });
}

renderInitialCards();

const cardTemplate = document.querySelector("#card-template").content;

export function createCard(cardData, handleDelete, handleImageClick) {
    // добавила параметр handleImageClick
    const cardItemCopy = cardTemplate.querySelector(".card").cloneNode(true);
    const cardItem = cardItemCopy.querySelector(".card__image");
    cardItem.src = cardData.link;
    cardItem.alt = cardData.name;
    cardItemCopy.querySelector(".card__title").textContent = cardData.name;

    // добавила обработчик клика на изображение карточки
    cardItem.addEventListener("click", () => handleImageClick(cardData)); // использую переданный обработчик

    cardItemCopy
        .querySelector(".card__delete-button")
        .addEventListener("click", function (e) {
            handleDelete(e);
        });

    cardItemCopy
        .querySelector(".card__like-button")
        .addEventListener("click", function (e) {
            cardLike(e);
        });

    return cardItemCopy;
}

export function removeCard(e) {
    e.target.closest(".card").remove();
}

function cardLike(e) {
    e.target.classList.toggle("card__like-button_is-active");
}

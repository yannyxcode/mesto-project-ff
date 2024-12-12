// Здравствуйте, внесла изменения
// Если не сложно, прикрепите пожалуйста ссылки на полезные статьи и доп ресурсы
// из своего опыта в рамках проекта
// С Наступающим Новым Годом!

import { putLike, deleteLike, deleteCard } from '../scripts/api';

const cardTemplate = document.querySelector('#card-template').content;

export function createCard(
    cardData,
    userId,
    cardLike,
    handleDelete,
    openImage
) {
    const cardItemCopy = cardTemplate.querySelector('.card').cloneNode(true);
    const cardItem = cardItemCopy.querySelector('.card__image');
    const cardDeleteButton = cardItemCopy.querySelector('.card__delete-button');
    const cardLikeButton = cardItemCopy.querySelector('.card__like-button');
    const cardLikeCount = cardItemCopy.querySelector('.card__like-count');

    cardItem.src = cardData.link;
    cardItem.alt = cardData.name;
    cardItemCopy.querySelector('.card__title').textContent = cardData.name;

    const likes = cardData.likes || [];
    cardLikeCount.textContent = likes.length;

    const isLiked = likes.some((like) => like._id === userId);
    if (isLiked) {
        cardLikeButton.classList.add('card__like-button_is-active');
    }

    if (cardData.owner._id === userId) {
        cardDeleteButton.style.display = 'block';
        cardDeleteButton.addEventListener('click', (e) => {
            handleDelete(e, cardData._id);
        });
    } else {
        cardDeleteButton.style.display = 'none';
    }

    cardLikeButton.addEventListener('click', (e) => {
        cardLike(e, cardData._id);
    });

    cardItem.addEventListener('click', () =>
        openImage(cardItem.src, cardItem.alt, cardData.name)
    );

    return cardItemCopy;
}

export const removeCard = (e, cardId) => {
    deleteCard(cardId)
        .then(() => {
            const cardElement = e.target.closest('.card');
            cardElement.remove();
        })
        .catch((err) => {
            console.log(err);
        });
};

export const cardLike = async (e, cardId) => {
    let currentLikes = e.target.parentNode.querySelector('.card__like-count');

    const isLiked = e.target.classList.contains('card__like-button_is-active');

    if (isLiked) {
        deleteLike(cardId)
            .then((updatedCard) => {
                e.target.classList.remove('card__like-button_is-active');
                currentLikes.textContent = updatedCard.likes.length;
            })
            .catch((err) => {
                console.log(err);
            });
    } else {
        putLike(cardId)
            .then((updatedCard) => {
                e.target.classList.add('card__like-button_is-active');
                currentLikes.textContent = updatedCard.likes.length;
            })
            .catch((err) => {
                console.log(err);
            });
    }
};

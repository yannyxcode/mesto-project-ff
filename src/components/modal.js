export function openModal(popup) {
    popup.classList.add('popup_is-opened');

    // обработчик нажатия escape
    document.addEventListener('keydown', handleEscClose);
}

export function closeModal(popup) {
    popup.classList.remove('popup_is-opened');

    // удаляем обработчик нажатия escape
    document.removeEventListener('keydown', handleEscClose);
}

// функция для обработки нажатия escape
function handleEscClose(event) {
    if (event.key === 'Escape') {
        const openPopup = document.querySelector('.popup_is-opened');
        if (openPopup) {
            closeModal(openPopup);
        }
    }
}

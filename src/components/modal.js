export function openModal(popup) {
    popup.classList.add('popup_is-opened');

    const closeButton = popup.querySelector('.popup__close');
    closeButton.addEventListener('click', () => closeModal(popup));

    popup.addEventListener('click', (e) => {
        if (e.target === popup) {
            closeModal(popup);
        }
    });

    const handleEscClose = (e) => {
        if (e.key === 'Escape') {
            closeModal(popup);
            document.removeEventListener('keydown', handleEscClose);
        }
    };
    document.addEventListener('keydown', handleEscClose);
}

export function closeModal(popup) {
    popup.classList.remove('popup_is-opened');
}

// Здравствуйте, сможете пожалуйста подробно описать, что нужно исправить и почему,
// чтобы я сразу разобралась в этой теме и мне было более понятно увидеть на практике
// как лучше и почему, заранее благодарю за ревью
// С Наступающим Новым Годом!

const enableValidation = (validationConfig) => {
    const formList = Array.from(
        document.querySelectorAll(validationConfig.formSelector)
    );
    formList.forEach((formElement) => {
        formElement.addEventListener('submit', (e) => e.preventDefault());
        setEventListeners(formElement, validationConfig);
    });
};

const setEventListeners = (
    formElement,
    {
        inputSelector,
        inputErrorClass,
        errorClass,
        submitButtonSelector,
        inactiveButtonClass,
    }
) => {
    const inputList = Array.from(formElement.querySelectorAll(inputSelector));
    const buttonElement = formElement.querySelector(submitButtonSelector);
    toggleButtonState(inputList, buttonElement, inactiveButtonClass);
    inputList.forEach((inputElement) => {
        inputElement.addEventListener('input', () => {
            checkInputValidity(
                formElement,
                inputElement,
                inputErrorClass,
                errorClass
            );
            toggleButtonState(inputList, buttonElement, inactiveButtonClass);
        });
    });
};

const checkInputValidity = (
    formElement,
    inputElement,
    inputErrorClass,
    errorClass
) => {
    inputElement.setCustomValidity(
        inputElement.validity.patternMismatch
            ? inputElement.dataset.errorMessage
            : ''
    );
    if (!inputElement.validity.valid) {
        showInputError(
            formElement,
            inputElement,
            inputElement.validationMessage,
            inputErrorClass,
            errorClass
        );
    } else {
        hideInputError(formElement, inputElement, inputErrorClass, errorClass);
    }
};

const showInputError = (
    formElement,
    inputElement,
    errorMessage,
    inputErrorClass,
    errorClass
) => {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.add(inputErrorClass);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(errorClass);
};

const hideInputError = (
    formElement,
    inputElement,
    inputErrorClass,
    errorClass
) => {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    if (errorElement) {
        inputElement.classList.remove(inputErrorClass);
        errorElement.textContent = '';
        errorElement.classList.remove(errorClass);
    }
};

const hasInvalidInput = (inputList) =>
    inputList.some((inputElement) => !inputElement.validity.valid);

const toggleButtonState = (inputList, buttonElement, inactiveButtonClass) => {
    if (hasInvalidInput(inputList)) {
        buttonElement.classList.add(inactiveButtonClass);
        buttonElement.disabled = true;
    } else {
        buttonElement.classList.remove(inactiveButtonClass);
        buttonElement.disabled = false;
    }
};

const clearValidation = (formElement, validationConfig) => {
    const inputList = Array.from(
        formElement.querySelectorAll(validationConfig.inputSelector)
    );
    const buttonElement = formElement.querySelector(
        validationConfig.submitButtonSelector
    );
    buttonElement.classList.remove(validationConfig.inactiveButtonClass);
    buttonElement.disabled = false;
    inputList.forEach((inputElement) => {
        hideInputError(
            formElement,
            inputElement,
            validationConfig.inputErrorClass,
            validationConfig.errorClass
        );
        inputElement.setCustomValidity('');
    });
};

export { enableValidation, clearValidation };

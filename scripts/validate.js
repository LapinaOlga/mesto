function enableValidation(settings) {
    const formList = Array.from(document.querySelectorAll(settings.formSelector));
    formList.forEach(function (formElement) {
        const buttonElement = formElement.querySelector(settings.submitButtonSelector)
        disableButton(buttonElement, settings.inactiveButtonClass)

        setEventListeners(settings, formElement)
    });
}

// Функция, которая сбрасывает поля с ошибкой при повторном открытии попапа
function resetFormErrors(formElement) {
    formElement.addEventListener('submit', function (event) {
        event.preventDefault();
        formElement.reset();
    });
}

//Добавляем слушатели форме и ее полям
function setEventListeners(settings, formElement) {
    formElement.addEventListener('submit', function (event) {
        event.preventDefault();
    });

    const inputList = Array.from(formElement.querySelectorAll(settings.inputSelector))
    const buttonElement = formElement.querySelector(settings.submitButtonSelector)
    // toggleButtonState(inputList, buttonElement, inactiveButtonClass);
    inputList.forEach(function (inputElement) {
        inputElement.addEventListener('input', function () {
            isValid(settings, inputElement);
            toggleButtonState(inputList, buttonElement, settings.inactiveButtonClass);
        });
    });

    const popup = formElement.closest('.popup')
    let popupButtonElement
    if (popup.classList.contains('profile-popup')) {
        popupButtonElement = profileEditButton
    } else {
        popupButtonElement = profileButton
    }

    popupButtonElement.addEventListener('click', function () {
        inputList.forEach(function (inputElement) {
            isValid(settings, inputElement);
        })
        toggleButtonState(inputList, buttonElement, settings.inactiveButtonClass);
    });

// сбрасываем все поля
    resetFormErrors(formElement);
}


// Функция, которая проверяет валидность поля
const isValid = (settings, inputElement) => {
    if (!inputElement.validity.valid) {
        // Если поле не проходит валидацию, покажем ошибку
        showError(settings, inputElement);
    } else {
        // Если проходит, скроем
        hideError(settings, inputElement);
    }
};

// Функция, которая добавляет класс с ошибкой
const showError = (settings, inputElement) => {
    const errorElement = inputElement.parentNode.getElementsByClassName(settings.errorClass)[0];
    inputElement.classList.add(settings.inputErrorClass);
    if (errorElement) {
        errorElement.textContent = inputElement.validationMessage;
    }
};

// Функция, которая удаляет класс с ошибкой
const hideError = (settings, inputElement) => {
    const errorElement = inputElement.parentNode.getElementsByClassName(settings.errorClass)[0];
    inputElement.classList.remove(settings.inputErrorClass);
    errorElement.textContent = ' ';
};


//Проверяем наличие невалидного поля
const hasInvalidInput = function (inputList) {
    // проходим по этому массиву методом some
    return inputList.some((inputElement) => {
        return !inputElement.validity.valid;
    })
};

// Функция принимает массив полей ввода
// и элемент кнопки, состояние которой нужно менять
const toggleButtonState = function (popupItemList, buttonElement, inactiveButtonClass) {
    if (hasInvalidInput(popupItemList)) {
        disableButton(buttonElement, inactiveButtonClass)
    } else {
        buttonElement.classList.remove(inactiveButtonClass);
        buttonElement.removeAttribute('disabled');
    }
}

function disableButton(buttonElement, inactiveButtonClass) {
    buttonElement.classList.add(inactiveButtonClass);
    buttonElement.setAttribute('disabled', true);
}


enableValidation({
    formSelector: '.popup__form',
    inputSelector: '.popup__item',
    submitButtonSelector: '.popup__button',
    inactiveButtonClass: 'popup__button_disabled',
    inputErrorClass: 'popup__item_type_error',
    errorClass: 'popup__error'
});


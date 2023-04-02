'use strict';

/**
 * Включает валидацию для всех форм на странице с указанными настройками
 * @param {Object} settings
 */
function enableValidation(settings) {
    const formList = Array.from(document.querySelectorAll(settings.formSelector));
    formList.forEach(function (formElement) {
        // Блокируем кнопку,потому что пользователь еще ничего не ввел
        const buttonElement = formElement.querySelector(settings.submitButtonSelector)
        disableButton(buttonElement, settings.inactiveButtonClass)

        setEventListeners(settings, formElement)
    });
}

/**
 * Добавляем слушатели форме, попапу и полям формы
 * @param {Object} settings
 * @param {HTMLFormElement} formElement
 */
function setEventListeners(settings, formElement) {
    const inputList = Array.from(formElement.querySelectorAll(settings.inputSelector))
    const buttonElement = formElement.querySelector(settings.submitButtonSelector)

    // Проверяем валидацию полей формы при вводе
    inputList.forEach(function (inputElement) {
        inputElement.addEventListener('input', function () {
            isValid(settings, inputElement);
            toggleButtonState(inputList, buttonElement, settings.inactiveButtonClass);
        });
    });

    // При сбросе формы, сбрасываем значение инпутов, так как форма их еще не сбросила
    // и блокируем кнопку создать/сохранить
    formElement.addEventListener('reset', function () {
        inputList.forEach(function (inputElement) {
            hideError(settings, inputElement)
            inputElement.value = null
        });
        toggleButtonState(inputList, buttonElement, settings.inactiveButtonClass);
    })
}

/**
 * Функция, которая проверяет валидность поля
 * @param {Object} settings
 * @param {HTMLFormElement} inputElement
 */
const isValid = (settings, inputElement) => {
    if (!inputElement.validity.valid) {
        // Если поле не проходит валидацию, покажем ошибку
        showError(settings, inputElement);
    } else {
        // Если проходит, скроем
        hideError(settings, inputElement);
    }
};

/**
 * Показывает ошибку валидации
 * @param {Object} settings
 * @param {HTMLFormElement} inputElement
 */
const showError = (settings, inputElement) => {
    const errorElement = inputElement.parentNode.getElementsByClassName(settings.errorClass)[0];
    inputElement.classList.add(settings.inputErrorClass);
    if (errorElement) {
        errorElement.textContent = inputElement.validationMessage;
    }
};

/**
 * Скрывает ошибку валидации
 * @param {Object} settings
 * @param {HTMLFormElement} inputElement
 */
const hideError = (settings, inputElement) => {
    const errorElement = inputElement.parentNode.getElementsByClassName(settings.errorClass)[0];
    inputElement.classList.remove(settings.inputErrorClass);
    errorElement.textContent = ' ';
};

/**
 * Проверяет наличие невалидного поля
 * @param {Array} inputList
 */
const hasInvalidInput = function (inputList) {
    // проходим по этому массиву методом some
    return inputList.some((inputElement) => {
        return !inputElement.validity.valid;
    })
};

/**
 * Блокирует или разблокирует кнопку сохранить/создать в зависимости от наличия ошибок в форме
 * @param {Array} popupItemList
 * @param {Element} buttonElement
 * @param {String} inactiveButtonClass
 */
const toggleButtonState = function (popupItemList, buttonElement, inactiveButtonClass) {
    if (hasInvalidInput(popupItemList)) {
        disableButton(buttonElement, inactiveButtonClass)
    } else {
        buttonElement.classList.remove(inactiveButtonClass);
        buttonElement.removeAttribute('disabled');
    }
}

/**
 * Блокирует кнопку сохранить/создать
 * @param {Element} buttonElement
 * @param {String} inactiveButtonClass
 */
function disableButton(buttonElement, inactiveButtonClass) {
    buttonElement.classList.add(inactiveButtonClass);
    buttonElement.setAttribute('disabled', 'disabled');
}

enableValidation({
    formSelector: '.popup__form',
    inputSelector: '.popup__item',
    submitButtonSelector: '.popup__button',
    inactiveButtonClass: 'popup__button_disabled',
    inputErrorClass: 'popup__item_type_error',
    errorClass: 'popup__error'
});


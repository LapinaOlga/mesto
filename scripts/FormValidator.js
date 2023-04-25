class FormValidator {
    constructor(settings, formElement) {
        this._settings = settings;
        this._formElement = formElement;
    }

    enableValidation() {
        // Блокируем кнопку,потому что пользователь еще ничего не ввел
        const buttonElement = this._formElement.querySelector(this._settings.submitButtonSelector)
        this._disableButton(buttonElement);
        this._setEventListeners(buttonElement);
    }

    _disableButton(buttonElement) {
        buttonElement.classList.add(this._settings.inactiveButtonClass);
        buttonElement.setAttribute('disabled', 'disabled');
    }

    _setEventListeners(buttonElement) {
        const inputList = Array.from(this._formElement.querySelectorAll(this._settings.inputSelector))

        // Проверяем валидацию полей формы при вводе
        inputList.forEach((inputElement) => {
            inputElement.addEventListener('input', () => {
                this._isValid(inputElement)
                this._toggleButtonState(inputList, buttonElement);
            });
        });

        // При сбросе формы, сбрасываем значение инпутов, так как форма их еще не сбросила
        // и блокируем кнопку создать/сохранить
        this._formElement.addEventListener('reset', () => {
            inputList.forEach((inputElement) => {
                this._hideError(inputElement)
                inputElement.value = null
            });
            this._toggleButtonState(inputList, buttonElement);
        })
    }

    _isValid(inputElement) {
        if (!inputElement.validity.valid) {
            // Если поле не проходит валидацию, покажем ошибку
            this._showError(inputElement)
        } else {
            // Если проходит, скроем
            this._hideError(inputElement)
        }
    }

    _showError(inputElement) {
        const errorElement = inputElement.parentNode.getElementsByClassName(this._settings.errorClass)[0];
        inputElement.classList.add(this._settings.inputErrorClass);
        if (errorElement) {
            errorElement.textContent = inputElement.validationMessage;
        }
    }

    _hideError(inputElement) {
        const errorElement = inputElement.parentNode.getElementsByClassName(this._settings.errorClass)[0];
        inputElement.classList.remove(this._settings.inputErrorClass);
        errorElement.textContent = ' ';
    }

    _toggleButtonState(popupItemList, buttonElement) {
        if (this._hasInvalidInput(popupItemList)) {
            this._disableButton(buttonElement)
        } else {
            buttonElement.classList.remove(this._settings.inactiveButtonClass);
            buttonElement.removeAttribute('disabled');
        }
    }

    _hasInvalidInput(inputList) {
        // проходим по этому массиву методом some
        return inputList.some((inputElement) => {
            return !inputElement.validity.valid;
        })
    };

}



export default FormValidator;



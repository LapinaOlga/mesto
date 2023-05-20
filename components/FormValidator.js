class FormValidator {
    _buttonElement = null
    _inputList = null

    constructor(settings, formElement) {
        this._settings = settings;
        this._formElement = formElement;
    }

    enableValidation() {
        // Блокируем кнопку,потому что пользователь еще ничего не ввел
        this._disableButton();
        this._setEventListeners();
    }

    _disableButton() {
        this._getButtonElement().classList.add(this._settings.inactiveButtonClass);
        this._getButtonElement().setAttribute('disabled', 'disabled');
    }

    _setEventListeners() {

        // Проверяем валидацию полей формы при вводе
        this._getInputList().forEach((inputElement) => {
            inputElement.addEventListener('input', () => {
                this._isValid(inputElement)
                this._toggleButtonState();
            });
        });

        // При сбросе формы, сбрасываем значение инпутов, так как форма их еще не сбросила
        // и блокируем кнопку создать/сохранить
        this._formElement.addEventListener('reset', () => {
            this._getInputList().forEach((inputElement) => {
                this._hideError(inputElement)
                inputElement.value = null
            });
            this._toggleButtonState();
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

    _toggleButtonState() {
        if (this._hasInvalidInput()) {
            this._disableButton()
        } else {
            this._getButtonElement().classList.remove(this._settings.inactiveButtonClass);
            this._getButtonElement().removeAttribute('disabled');
        }
    }

    _hasInvalidInput() {
        // проходим по этому массиву методом some
        return this._getInputList().some((inputElement) => {
            return !inputElement.validity.valid;
        })
    }

    _getButtonElement() {
        if (this._buttonElement === null) {
            this._buttonElement = this._formElement.querySelector(this._settings.submitButtonSelector)
        }

        return this._buttonElement
    }

    _getInputList() {
        if (this._inputList === null) {
            this._inputList = Array.from(this._formElement.querySelectorAll(this._settings.inputSelector))
        }

        return this._inputList
    }
}


export default FormValidator;



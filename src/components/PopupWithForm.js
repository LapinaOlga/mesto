import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {

    constructor(popupSelector, submitButtonSelector, onSubmit) {
        super(popupSelector);
        this._submitButton = this._popup.querySelector(submitButtonSelector)
        this._form = this._submitButton.closest('form');
        this._onSubmit = onSubmit;
        this._formFields = this._form.querySelectorAll('input');

    }

    setEventListeners() {
        super.setEventListeners()

        this._form.addEventListener('submit', (event) => {
            event.preventDefault();
            const formData = this._getInputValues()
            this._onSubmit(formData)
            this.close()
        })
    }

    close() {
        super.close();

        this._form.reset()
    }

    _getInputValues() {
        const result = {};
        this._formFields.forEach((input) => {
            const inputName = input.getAttribute('name');
            const inputValue = input.value;
            result[inputName] = inputValue;
        });

        return result;
    }


}
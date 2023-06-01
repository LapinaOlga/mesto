import Popup from "./Popup";

export default class PopupWithConfirmation extends Popup {
    constructor(popupSelector, submitButtonSelector) {
        super(popupSelector);
        this._submitButton = this._popup.querySelector(submitButtonSelector);
    }

    setEventListeners() {
        super.setEventListeners();
        this._submitButton.addEventListener('click', (event) => {
            event.preventDefault();
            this._onConfirm(true);
        });
    }

    open(onConfirm) {
        this._onConfirm = onConfirm;

        super.open();
    }

    close() {
        super.close();
    }
}
import Popup from "./Popup";

export default class PopupWithConfirmation extends Popup {
    constructor(popupSelector, submitButtonSelector) {
        super(popupSelector);
        this._submitButton = this._popup.querySelector(submitButtonSelector);
        this._isConfirmed = false;
    }

    setEventListeners() {
        super.setEventListeners();
        this._submitButton.addEventListener('click', (event) => {
            event.preventDefault();
            this._isConfirmed = true;
            this.close();
        });
    }

    open(onConfirm) {
        this._isConfirmed = false;
        this._onConfirm = onConfirm;

        super.open();
    }

    close() {
        this._onConfirm(this._isConfirmed);
        super.close();
    }
}
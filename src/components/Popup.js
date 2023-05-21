export default class Popup {
    constructor(popupSelector) {
        this._popup = document.querySelector(popupSelector);
        this._popupCloseButton = this._popup.querySelector('.popup__icon-close')
    }

    setEventListeners() {
        this._popupCloseButton.addEventListener('click', this._handleCloseByCloseButton)
        this._popup.addEventListener('click', this._handleClickByOverlay)
    }

    open() {
        this._popup.classList.add('popup_opened');
        document.addEventListener('keydown', this._handleEscClose);
    }

    close() {
        this._popup.classList.remove('popup_opened');
        document.removeEventListener('keydown', this._handleEscClose);
    }

    _handleEscClose = (event) => {
        if (event.key === 'Escape') {
            this.close()
        }
    }

    _handleCloseByCloseButton = () => {
        this.close()
    }

    _handleClickByOverlay = (event) => {
        if (event.target === event.currentTarget) {
            this.close()
        }
    }

}
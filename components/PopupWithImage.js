import Popup from "./Popup.js";

export default class PopupWithImage extends Popup {
    constructor(popupSelector) {
        super(popupSelector);
        this._popupImage = this._popup.querySelector('.popup__image');
        this._popupDescription = this._popup.querySelector('.popup__description');
    }

    open(cardData){
        super.open();
        this._popupImage.src = cardData.link;
        this._popupImage.alt = cardData.name;
        this._popupDescription.textContent = cardData.name;
    }
}
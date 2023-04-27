class Card {
    constructor(name, link, selectorTemplate, onClickByImage) {
        this.name = name;
        this.link = link;
        this._selectorTemplate = selectorTemplate;
        this._onClickByImage = onClickByImage;
    }

    make() {
        const result = this._getElement()
        this._setEventListeners(result)

        return result;
    }

    _setEventListeners(card) {
        this._addEventListenerForImagePopup(card, this._onClickByImage)
        this._addEventListenerForLike(card)
        this._addEventListenerForTrashButton(card)
    }

    _getElement() {
        const cardTemplate = document.querySelector(this._selectorTemplate).content;
        const cardElement = cardTemplate.querySelector('.element').cloneNode(true);
        const cardImage = cardElement.querySelector('.element__image');
        const cardTitle = cardElement.querySelector('.element__title');
        cardImage.src = this.link;
        cardImage.setAttribute('alt', this.name)
        cardTitle.textContent = this.name;

        return cardElement;
    }

    _addEventListenerForImagePopup(element, listener) {
        element
            .querySelector('.element__image')
            .addEventListener('click', () => listener(this))
    }

    _addEventListenerForLike(element) {
        element
            .querySelector('.element__button')
            .addEventListener('click', function (event) {
                event.target.classList.toggle('element__button_active');
            })
    }

    _addEventListenerForTrashButton(element) {
        element
            .querySelector('.element__trash-button')
            .addEventListener('click', function (event) {
                event.target.closest('.element').remove();
            })
    }

}

export default Card;


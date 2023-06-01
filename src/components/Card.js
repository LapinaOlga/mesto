class Card {
    constructor(
        card,
        selectorTemplate,
        currentUser,
        handleCardClick,
        handleCardRemove,
        handleLikeClick,
    ) {
        this._card = card;
        this._selectorTemplate = selectorTemplate;
        this._handleCardClick = handleCardClick;
        this._handleCardRemove = handleCardRemove;
        this._handleLikeClick = handleLikeClick;
        this._currentUser = currentUser;
    }

    /**
     * Создает элемент карточки.
     *
     * @returns {Node}
     */
    make() {
        const result = this._getElement()
        this._setEventListeners(result)

        return result;
    }

    /**
     * Добавляет события для указанного элемента карточи.
     *
     * @param {Node} cardElement
     * @private
     */
    _setEventListeners(cardElement) {
        this._addEventListenerForImagePopup(cardElement, this._handleCardClick)
        this._addEventListenerForLike()

        if (this._card.owner._id === this._currentUser.getUserInfo().id) {
            this._addEventListenerForTrashButton()
        }
    }

    /**
     * Формирует и возвращает элемент карточки.
     *
     * @returns {Node}
     * @private
     */
    _getElement() {
        const cardTemplate = document.querySelector(this._selectorTemplate).content;
        const cardElement = cardTemplate.querySelector('.element').cloneNode(true);
        const cardImage = cardElement.querySelector('.element__image');
        const cardTitle = cardElement.querySelector('.element__title');
        cardImage.src = this._card.link;
        cardImage.setAttribute('alt', this._card.name)
        cardTitle.textContent = this._card.name;

        this._trashButton = cardElement.querySelector('.element__trash-button');
        this._likeButton = cardElement.querySelector('.element__button');
        this._likeNumber = cardElement.querySelector('.element__text');

        if (this._card.owner._id !== this._currentUser.getUserInfo().id) {
            this._trashButton.remove();
        }

        for (const user of this._card.likes) {
            if (user._id === this._currentUser.getUserInfo().id) {
                this._toggleLikeButton()
                break;
            }
        }

        this._changeNumberOfLikes();

        return cardElement;
    }

    /**
     * Добавляет события для изображения карточки.
     *
     * @param cardElement
     * @param listener
     * @private
     */
    _addEventListenerForImagePopup(cardElement, listener) {
        cardElement
            .querySelector('.element__image')
            .addEventListener('click', () => listener())
    }

    /**
     * Добавляет события для кнопки "like".
     *
     * @private
     */
    _addEventListenerForLike() {
        this._likeButton.addEventListener('click', (event) => {
            const isActive = event.target.classList.contains('element__button_active');

            this._handleLikeClick(this._card, isActive, (card) => {
                this._card = card;
                this._changeNumberOfLikes();
                this._toggleLikeButton();
            });
        })
    }

    /**
     * Добавляет события для кнопки удаения.
     *
     * @private
     */
    _addEventListenerForTrashButton() {
        this._trashButton.addEventListener('click', (event) => {
            this._handleCardRemove(this._card, () => {
                event.target.closest('.element').remove();
            });
        });
    }

    /**
     * Меняет состояние кнопки "like".
     *
     * @private
     */
    _toggleLikeButton() {
        this._likeButton.classList.toggle('element__button_active');
    }

    /**
     * Изменяет количество лайков в карточе.
     *
     * @private
     */
    _changeNumberOfLikes() {
        this._likeNumber.textContent = this._card.likes.length;
    }
}

export default Card;


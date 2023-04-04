'use strict';

const profileEditButton = document.querySelector('.profile__edit-button');
const profileButton = document.querySelector('.profile__button');
const profilePopup = document.querySelector('.profile-popup');
const cardPopup = document.querySelector('.card-popup');
const inputUserName = document.querySelector('input.popup__item_el_name');
const profileTitle = document.querySelector('.profile__title');
const inputUserProfession = document.querySelector('input.popup__item_el_profession');
const profileSubtitle = document.querySelector('.profile__subtitle');
const profileForm = document.querySelector('.profile-popup form');
const cardForm = document.querySelector('.card-popup form');
const cardElements = document.querySelector('.elements');
const imagePopup = document.querySelector('.image-popup');
const popupImage = document.querySelector('.popup__image')
const popupDescription = document.querySelector('.popup__description')
const inputLocation = document.querySelector('input.popup__item_el_location');
const inputLink = document.querySelector('input.popup__item_el_link');

let openedPopup = null

/**
 * Общая функция закрытия попапа
 * @param {Element} popup
 */
function closePopup(popup) {
    popup.classList.remove('popup_opened');
    openedPopup = null
    document.removeEventListener('keydown', closePopupByEsc)
}

/**
 * Общая функция отрытия попапа
 * @param {Element} popup
 */
function openPopup(popup) {
    popup.classList.add('popup_opened');
    openedPopup = popup
    document.addEventListener('keydown', closePopupByEsc)
}

/**
 * Общая функция очистки попапа формы
 * @param {Element} popup
 */
const resetPopupForm = function (popup) {
    const popupForm = popup.querySelector('.popup__form')
    if (popupForm) {
        popupForm.reset()
    }
}

/**
 * Создает элемент карточки
 * @param {Object} card
 * @returns {Node}
 */
function createCard(card) {
    const cardTemplate = document.querySelector('#elements').content;
    const cardElement = cardTemplate.querySelector('.element').cloneNode(true);
    const cardImage = cardElement.querySelector('.element__image');
    const cardTitle = cardElement.querySelector('.element__title');
    cardImage.src = card.link;
    cardImage.setAttribute('alt', card.name)
    cardTitle.textContent = card.name;

    //Реализуем открытие картинки-попапа
    const img = cardElement.querySelector('.element__image')
    img.addEventListener('click', function () {
        openPopup(imagePopup);
        popupImage.src = card.link;
        popupImage.setAttribute('alt', card.name)
        popupDescription.textContent = card.name;
    })

    // Реализуем лайки и удаление карточки при клике на trash
    cardElement.addEventListener('click', function (event) {
        if (event.target.classList.contains('element__button')) {
            event.target.classList.toggle('element__button_active');
        }

        if (event.target.classList.contains('element__trash-button')) {
            event.target.closest('.element').remove();
        }
    })

    return cardElement;
}

/**
 * Добавляет карточку на страницу
 * @param {Node} newCard
 */
function addCard(newCard) {
    cardElements.prepend(newCard);
}

/**
 * Общая функция закрытия попапов на крестик и на overlay
 * @param {Event} event
 */
function isClosingPopup(event) {
    return event.target.classList.contains('popup__icon-close-image')
        || event.target === event.currentTarget
}

/**
 * Закрытие попапа на Escape
 * @param {KeyboardEvent} event
 */
const closePopupByEsc = function (event) {
    if (event.key === 'Escape') {
        closePopup(openedPopup)
    }
}

// Попап редактирования профиля
profileForm.addEventListener('submit', function (event) {
    event.preventDefault();
    profileTitle.textContent = inputUserName.value;
    profileSubtitle.textContent = inputUserProfession.value;
    closePopup(profilePopup);
    resetPopupForm(profilePopup);
});

// Открываем попап и добавляем текст из профиля в попап
profileEditButton.addEventListener('click', function () {
    inputUserName.value = profileTitle.textContent;
    inputUserProfession.value = profileSubtitle.textContent;
    openPopup(profilePopup);

    const inputEvent = new Event('input')
    inputUserName.dispatchEvent(inputEvent)
});

//Попап создания карточки
profileButton.addEventListener('click', function () {
    openPopup(cardPopup);
});

initialCards.forEach(function (item) {
    addCard(createCard(item))
})

// Создание новой карточки из попапа
cardForm.addEventListener('submit', function (event) {
    event.preventDefault();
    addCard(
        createCard({
            link: inputLink.value,
            name: inputLocation.value,
        })
    );
    closePopup(cardPopup);
    resetPopupForm(cardPopup);
});

// на попап для профиля устанавливаем слушатель события клик
profilePopup.addEventListener('click', function (event) {
    if (isClosingPopup(event)) {
        closePopup(profilePopup)
        resetPopupForm(profilePopup);
    }
})

// на попап для карточки устанавливаем слушатель события клик
cardPopup.addEventListener('click', function (event) {
    if (isClosingPopup(event)) {
        closePopup(cardPopup)
        resetPopupForm(cardPopup);
    }
})

// на попап картинки устанавливаем слушатель события клик
imagePopup.addEventListener('click', function (event) {
    if (isClosingPopup(event)) {
        closePopup(imagePopup)
    }
})




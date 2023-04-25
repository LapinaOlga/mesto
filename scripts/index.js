'use strict';

import initialCards from "./cards.js";
import Card from "./Card.js";
import FormValidator from "./FormValidator.js";

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

const selectorTemplate = '#elements';

const validatorSettings = {
    formSelector: '.popup__form',
    inputSelector: '.popup__item',
    submitButtonSelector: '.popup__button',
    inactiveButtonClass: 'popup__button_disabled',
    inputErrorClass: 'popup__item_type_error',
    errorClass: 'popup__error'
}

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
 * @param {Object} data
 * @returns {Node}
 */
function createCard(data) {
    const card = new Card(data.name, data.link, selectorTemplate)
    return card.make(function (card) {
        openPopup(imagePopup);
        popupImage.src = card.link;
        popupImage.setAttribute('alt', card.name)
        popupDescription.textContent = card.name;
    })
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

const profileFormValidator = new FormValidator(validatorSettings, profileForm)
profileFormValidator.enableValidation()

const cardFormValidator = new FormValidator(validatorSettings, cardForm)
cardFormValidator.enableValidation()



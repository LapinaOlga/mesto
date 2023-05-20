'use strict';

import initialCards from "../components/cards.js";
import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithForm from "../components/PopupWithForm.js";
import UserInfo from "../components/UserInfo.js";

const profileEditButton = document.querySelector('.profile__edit-button');
const profileButton = document.querySelector('.profile__button');
const inputUserName = document.querySelector('input.popup__item_el_name');
const inputUserProfession = document.querySelector('input.popup__item_el_profession');
const profileForm = document.querySelector('.profile-popup form');
const cardForm = document.querySelector('.card-popup form');
const cardElements = document.querySelector('.elements');

const selectorTemplate = '#elements';

const validatorSettings = {
    formSelector: '.popup__form',
    inputSelector: '.popup__item',
    submitButtonSelector: '.popup__button',
    inactiveButtonClass: 'popup__button_disabled',
    inputErrorClass: 'popup__item_type_error',
    errorClass: 'popup__error'
}

const userInfoInstance = new UserInfo({
    name: '.profile__title',
    profession: '.profile__subtitle'
})

const profilePopup = new PopupWithForm('.profile-popup', '.popup__button', function (formData) {
    userInfoInstance.setUserInfo(formData);
});

profilePopup.setEventListeners();

const cardPopup = new PopupWithForm('.card-popup', '.popup__button', (formData) => {
    addCard(
        createCard(formData)
    );
})
cardPopup.setEventListeners();

const profileFormValidator = new FormValidator(validatorSettings, profileForm)
profileFormValidator.enableValidation()

const cardFormValidator = new FormValidator(validatorSettings, cardForm)
cardFormValidator.enableValidation()

/**
 * Создает элемент карточки
 * @param {Object} data
 * @returns {Node}
 */
function createCard(data) {
    const card = new Card(data.name, data.link, selectorTemplate, function () {
        const popup = new PopupWithImage('.image-popup');
        popup.setEventListeners()
        popup.open(data)
    })

    return card.make()
}

/**
 * Добавляет карточку на страницу
 * @param {Node} newCard
 */
function addCard(newCard) {
    cardElements.prepend(newCard);
}

// Открываем попап и добавляем текст из профиля в попап
profileEditButton.addEventListener('click', function () {
    const userInfo = userInfoInstance.getUserInfo()

    inputUserName.value = userInfo.name;
    inputUserProfession.value = userInfo.profession;

    profilePopup.open()

    const inputEvent = new Event('input')
    inputUserName.dispatchEvent(inputEvent)
});

//Попап создания карточки
profileButton.addEventListener('click', function () {
    cardPopup.open()
});

initialCards.forEach(function (item) {
    addCard(createCard(item))
})

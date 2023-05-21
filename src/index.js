'use strict';
import './pages/index.css';

import initialCards from "./components/cards.js";
import Card from "./components/Card.js";
import FormValidator from "./components/FormValidator.js";
import PopupWithImage from "./components/PopupWithImage.js";
import PopupWithForm from "./components/PopupWithForm.js";
import UserInfo from "./components/UserInfo.js";
import Section from "./components/Section.js";

const profileEditButton = document.querySelector('.profile__edit-button');
const profileButton = document.querySelector('.profile__button');
const inputUserName = document.querySelector('input.popup__item_el_name');
const inputUserProfession = document.querySelector('input.popup__item_el_profession');
const profileForm = document.querySelector('.profile-popup form');
const cardForm = document.querySelector('.card-popup form');

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
    addCard(formData);
});
cardPopup.setEventListeners();

const imagePopup = new PopupWithImage('.image-popup');
imagePopup.setEventListeners();

const profileFormValidator = new FormValidator(validatorSettings, profileForm);
profileFormValidator.enableValidation();

const cardFormValidator = new FormValidator(validatorSettings, cardForm);
cardFormValidator.enableValidation();

const section = new Section({
    items: initialCards,
    renderer: createCard
}, ".elements")

section.render();

/**
 * Создает элемент карточки
 * @param {Object} rawCard
 * @returns {Node}
 */
function createCard(rawCard) {
    const card = new Card(rawCard.name, rawCard.link, selectorTemplate, function () {
        imagePopup.open(rawCard);
    })

    return card.make();
}

/**
 * Добавляет карточку на страницу
 * @param {Object} rawCard
 */
function addCard(rawCard) {
    section.addItem(
        createCard(rawCard)
    );
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


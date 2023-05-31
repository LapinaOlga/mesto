'use strict';
import './pages/index.css';
import Card from "./components/Card.js";
import FormValidator from "./components/FormValidator.js";
import PopupWithImage from "./components/PopupWithImage.js";
import PopupWithForm from "./components/PopupWithForm.js";
import UserInfo from "./components/UserInfo.js";
import Section from "./components/Section.js";
import Api from "./components/Api.js";
import PopupWithConfirmation from "./components/PopupWithConfirmation";

const profileEditButton = document.querySelector('.profile__edit-button');
const profileButton = document.querySelector('.profile__button');
const profileAvatarButton = document.querySelector('.profile__avatar-button');
const inputUserName = document.querySelector('input.popup__item_el_name');
const inputUserProfession = document.querySelector('input.popup__item_el_profession');
const profileForm = document.querySelector('.profile-popup form');
const cardForm = document.querySelector('.card-popup form');
const avatarPopupForm = document.querySelector('.update-popup form');

const selectorTemplate = '#elements';

const validatorSettings = {
    formSelector: '.popup__form',
    inputSelector: '.popup__item',
    submitButtonSelector: '.popup__button',
    inactiveButtonClass: 'popup__button_disabled',
    inputErrorClass: 'popup__item_type_error',
    errorClass: 'popup__error'
};

const api = new Api({
    baseUrl: `https://mesto.nomoreparties.co/v1/cohort-66`,
    headers: {
        authorization: '03bede17-6085-4ace-b801-04f52b01265d',
        'Content-Type': 'application/json',
    },
});

const userInfoInstance = new UserInfo({
    name: '.profile__title',
    about: '.profile__subtitle',
    avatar: '.profile__avatar',
})

const profilePopup = new PopupWithForm('.profile-popup', '.popup__button', function (formData) {
    api.updateUser(formData)
        .then((user) => {
            userInfoInstance.setUserInfo(user);
        })
        .catch((error) => {
            console.log('Сервер вернул ошибку', error);
        })
        .finally(() => {
            profilePopup.close();
        });
});

profilePopup.setEventListeners();

const cardPopup = new PopupWithForm(
    '.card-popup',
    '.popup__button',
    (formData, submitButton) => {
        submitButton.textContent = 'Сохранение...';
        submitButton.setAttribute('disabled', true);

        api.createCard(formData)
            .then((card) => {
                addCard(card)
            })
            .catch((error) => {
                console.log('Сервер вернул ошибку', error);
            })
            .finally(() => {
                cardPopup.close();

                submitButton.textContent = 'Создать';
                submitButton.setAttribute('disabled', false);
            });
    });
cardPopup.setEventListeners();

const imagePopup = new PopupWithImage('.image-popup');
imagePopup.setEventListeners();

const avatarPopup = new PopupWithForm(
    '.update-popup',
    '.popup__button',
    (formData, submitButton) => {
        submitButton.textContent = 'Сохранение...';
        submitButton.setAttribute('disabled', true);

        api.updateUserAvatar(formData.link)
            .then((user) => {
                userInfoInstance.setUserInfo(user);
            })
            .catch((error) => {
                console.log('Сервер вернул ошибку', error);
            })
            .finally(() => {
                avatarPopup.close();

                submitButton.textContent = 'Создать';
                submitButton.setAttribute('disabled', false);
            });
    });
avatarPopup.setEventListeners();

const confirmPopup = new PopupWithConfirmation('.confirm-popup', '.popup__button');
confirmPopup.setEventListeners();

const profileFormValidator = new FormValidator(validatorSettings, profileForm);
profileFormValidator.enableValidation();

const cardFormValidator = new FormValidator(validatorSettings, cardForm);
cardFormValidator.enableValidation();

const avatarFormValidator = new FormValidator(validatorSettings, avatarPopupForm);
avatarFormValidator.enableValidation();

const section = new Section({items: [], renderer: createCard}, ".elements")

section.render();

/**
 * Создает элемент карточки
 * @param {Object} rawCard
 * @returns {Node}
 */
function createCard(rawCard) {
    const card = new Card(
        rawCard,
        selectorTemplate,
        userInfoInstance,
        function () {
            imagePopup.open(rawCard);
        },
        function (card) {
            return api.deleteCard(card._id);
        },
        function (card, isDeleting) {
            if (isDeleting) {
                return api.removeCardLike(card._id);
            }

            return api.addCardLike(card._id);
        },
        function () {
            return new Promise((resolve, reject) => {
                confirmPopup.open(
                    function(isConfirmed){
                        isConfirmed ? resolve() : reject();
                    }
                )
            });
        },
    )

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
    inputUserProfession.value = userInfo.about;

    profilePopup.open()

    const inputEvent = new Event('input')
    inputUserName.dispatchEvent(inputEvent)
});

// Попап создания карточки
profileButton.addEventListener('click', function () {
    cardPopup.open()
});

profileAvatarButton.addEventListener('click', function () {
    avatarPopup.open();
});

api.getUser().then((user) => {
    userInfoInstance.setUserInfo(user);

    api.getCardList().then((list) => {
        list.reverse().forEach((card) => section.addItem(
            createCard(card)
        ));
    });
});

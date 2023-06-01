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
import {renderLoading} from "./utils/utils";

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

const confirmPopup = new PopupWithConfirmation('.confirm-popup', '.popup__button');
confirmPopup.setEventListeners();

const profileFormValidator = new FormValidator(validatorSettings, profileForm);
profileFormValidator.enableValidation();

const cardFormValidator = new FormValidator(validatorSettings, cardForm);
cardFormValidator.enableValidation();

const avatarFormValidator = new FormValidator(validatorSettings, avatarPopupForm);
avatarFormValidator.enableValidation();

let section;

const profilePopup = new PopupWithForm('.profile-popup', '.popup__button', function (formData) {
    api.updateUser(formData)
        .then((user) => {
            userInfoInstance.setUserInfo(user);
            profilePopup.close();
        })
        .catch((error) => {
            console.log('Сервер вернул ошибку', error);
        });
});

profilePopup.setEventListeners();

const cardPopup = new PopupWithForm(
    '.card-popup',
    '.popup__button',
    (formData, submitButton) => {
        renderLoading(submitButton, 'Сохранение...')
        cardFormValidator.disableSubmitButton();

        api.createCard(formData)
            .then((card) => {
                addCard(card);
                cardPopup.close();
            })
            .catch((error) => {
                console.log('Сервер вернул ошибку', error);
            })
            .finally(() => {
                renderLoading(submitButton, 'Создать');
                cardFormValidator.enableSubmitButton();
            });
    });
cardPopup.setEventListeners();

const imagePopup = new PopupWithImage('.image-popup');
imagePopup.setEventListeners();

const avatarPopup = new PopupWithForm(
    '.update-popup',
    '.popup__button',
    (formData, submitButton) => {
        renderLoading(submitButton, 'Сохранение...');
        avatarFormValidator.disableSubmitButton();

        api.updateUserAvatar(formData.link)
            .then((user) => {
                userInfoInstance.setUserInfo(user);
                avatarPopup.close();
            })
            .catch((error) => {
                console.log('Сервер вернул ошибку', error);
            })
            .finally(() => {
                renderLoading(submitButton, 'Создать');
                avatarFormValidator.enableSubmitButton();
            });
    });
avatarPopup.setEventListeners();

/**
 * Создает элемент карточки
 * @param {Object} rawCard
 * @returns {Node}
 */
function createCard(rawCard) {
    const cardInstance = new Card(
        rawCard,
        selectorTemplate,
        userInfoInstance,
        function () {
            imagePopup.open(rawCard);
        },
        function (card, onComplete) {
            confirmPopup.open(
                function (isConfirmed) {
                    if (isConfirmed) {
                        api.deleteCard(card._id)
                            .then(() => {
                                onComplete()
                                confirmPopup.close();
                            })
                            .catch((error) => {
                                console.log('Сервер вернул ошибку', error);
                            });
                    } else {
                        confirmPopup.close();
                    }
                }
            )
        },
        function (card, isDeleting, onComplete) {
            const promise = isDeleting
                ? api.removeCardLike(card._id)
                : api.addCardLike(card._id);

            promise
                .then((card) => {
                    onComplete(card);
                })
                .catch((error) => {
                    console.log('Сервер вернул ошибку', error);
                });
        },
    )

    return cardInstance.make();
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

api.getUser()
    .then((user) => {
        userInfoInstance.setUserInfo(user);

        api.getCardList()
            .then((list) => {
                section = new Section({items: list.reverse(), renderer: createCard}, ".elements")
                section.renderItems();
            })
            .catch((error) => {
                console.log('Сервер вернул ошибку', error);
            });
    })
    .catch((error) => {
        console.log('Сервер вернул ошибку', error);
    });

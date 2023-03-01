'use strict';

const profileEditButton = document.querySelector('.profile__edit-button');

const popup = document.querySelector('.popup');

profileEditButton.addEventListener('click', function () {
    popup.classList.add('popup_opened');
    inputUserName.value = profileTitle.textContent;
    inputUserProfession.value = profileSubtitle.textContent;
});

const popupIconClose = document.querySelector('.popup__icon-close');

popupIconClose.addEventListener('click', function () {
    popup.classList.remove('popup_opened');
});

const inputUserName = document.querySelector('input.popup__name');
const profileTitle = document.querySelector('.profile__title');

const inputUserProfession = document.querySelector('input.popup__profession');
const profileSubtitle = document.querySelector('.profile__subtitle');


const popupButton = document.querySelector('.popup__button');
popupButton.addEventListener('click', function () {
    popup.classList.remove('popup_opened');
    profileTitle.textContent = inputUserName.value;
    profileSubtitle.textContent = inputUserProfession.value;
});

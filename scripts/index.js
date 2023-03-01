'use strict';

const profileEditButton = document.querySelector('.profile__edit-button');

const popup = document.querySelector('.popup');

const popupIconClose = document.querySelector('.popup__icon-close');

const inputUserName = document.querySelector('input.popup__item_el_name');

const profileTitle = document.querySelector('.profile__title');

const inputUserProfession = document.querySelector('input.popup__item_el_profession');

const profileSubtitle = document.querySelector('.profile__subtitle');

const profileForm = document.querySelector('form');

function closePopup() {
    popup.classList.remove('popup_opened');
}
profileForm.addEventListener('submit', function (event) {
    event.preventDefault();
    closePopup();
    profileTitle.textContent = inputUserName.value;
    profileSubtitle.textContent = inputUserProfession.value;
});

profileEditButton.addEventListener('click', function () {
    popup.classList.add('popup_opened');
    inputUserName.value = profileTitle.textContent;
    inputUserProfession.value = profileSubtitle.textContent;
});

popupIconClose.addEventListener('click', function () {
    closePopup();
});




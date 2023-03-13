'use strict';

const profileEditButton = document.querySelector('.profile__edit-button');
const profileButton = document.querySelector('.profile__button');
const profilePopup = document.querySelector('.profile-popup');
const cardPopup = document.querySelector('.card-popup');
const imagePopup = document.querySelector('.image-popup');
const profilePopupIconClose = profilePopup.querySelector('.popup__icon-close');
const cardPopupIconClose = cardPopup.querySelector('.popup__icon-close');
const imagePopupIconClose  = imagePopup.querySelector('.popup__icon-close');
const inputUserName = document.querySelector('input.popup__item_el_name');
const profileTitle = document.querySelector('.profile__title');
const inputUserProfession = document.querySelector('input.popup__item_el_profession');
const profileSubtitle = document.querySelector('.profile__subtitle');
const profileForm = document.querySelector('.profile-popup form');
const cardForm = document.querySelector('.card-popup form');
const inputLocation = document.querySelector('input.popup__item_el_location');
const inputLink = document.querySelector('input.popup__item_el_link');
const cardElements = document.querySelector('.elements');
const cardTemplate = document.querySelector('#elements').content;
const cardElement = cardTemplate.querySelector('.element');
const cardImage = cardElement.querySelector('.element__image');
const cardArea = cardElement.querySelector('.element__area');
const cardTitle = cardArea.querySelector('.element__title');


// Общая функция закрытия попапа
function closePopup(popupClassName) {
    popupClassName.classList.remove('popup_opened');
}

// Общая функция открытия попапа
function openPopup(popupClassName) {
    popupClassName.classList.add('popup_opened');
}

//Попап для редактирования профиля

profileForm.addEventListener('submit', function (event) {
    event.preventDefault();
    profileTitle.textContent = inputUserName.value;
    profileSubtitle.textContent = inputUserProfession.value;
    closePopup(profilePopup);
});

// Открываем попап и добавляем текст из профиля в попап
profileEditButton.addEventListener('click', function () {
    openPopup(profilePopup);
    inputUserName.value = profileTitle.textContent;
    inputUserProfession.value = profileSubtitle.textContent;
});
// Закрываем попап
profilePopupIconClose.addEventListener('click', function () {
    closePopup(profilePopup);
});


//Попап для создания карточки

profileButton.addEventListener('click', function () {
    openPopup(cardPopup);
});

cardPopupIconClose.addEventListener('click', function () {
    closePopup(cardPopup);
});

//Попап для картинки

imagePopupIconClose.addEventListener('click', function () {
    closePopup(imagePopup);
});


// Создаем карточки

const initialCards = [
    {
        name: 'Архыз',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
    },
    {
        name: 'Челябинская область',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
    },
    {
        name: 'Иваново',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
    },
    {
        name: 'Камчатка',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
    },
    {
        name: 'Холмогорский район',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
    },
    {
        name: 'Байкал',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
    }
];

// Добавление карточек

function addCard(card) {
    cardImage.src = card.link;
    cardTitle.textContent = card.name;
    const newCard = cardElement.cloneNode(true);
    cardElements.prepend(newCard);

    // Реализуем лайки
    const addLike = newCard.querySelector('.element__button')
    addLike.addEventListener('click', function (event) {
        event.target.classList.toggle('element__button_active');
    })

    //Реализуем удаление карточки при клике на trash
    const trashButton = newCard.querySelector('.element__trash-button')
    trashButton.addEventListener('click', function () {
        const item = trashButton.closest('.element');
        item.remove();
    })

    //Реализуем открытие картинки-попапа
    const img = newCard.querySelector('.element__image')
    img.addEventListener('click', function () {
        openPopup(imagePopup);
        const popupImage = document.querySelector('.popup__image')
        const popupDescription = document.querySelector('.popup__description')
        popupImage.src = card.link;
        popupDescription.textContent = card.name;
    })

}

for (let i = 0; i < initialCards.length; i++) {
    addCard(initialCards[i])
}

// Создание новой карточки из попапа
cardForm.addEventListener('submit', function (event) {
    event.preventDefault();
    addCard({
        link: inputLink.value,
        name: inputLocation.value,
    });

    const cards = cardElements.querySelectorAll('.element');

    if (cards.length > 6) {
        cards[cards.length - 1].remove()
    }

    closePopup(cardPopup);
    inputLink.value = null
    inputLocation.value = null

});















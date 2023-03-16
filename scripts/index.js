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


// Общая функция закрытия попапа
function closePopup(popupClassName) {
    popupClassName.classList.remove('popup_opened');
}

// Общая функция открытия попапа
function openPopup(popupClassName) {
    popupClassName.classList.add('popup_opened');
}

const allPopups = Array.from(document.querySelectorAll('.popup')); // нашли все попапы на странице
allPopups.forEach(function (popup) {
    popup.addEventListener('click', function (event) { // на каждый попап устанавливает слушатель события клик
        // далее проверяем наличие класса кнопку закрытия.
        // Если класс кнопки (в вашем случае изображения) есть, то закрываем попап общей функцией закрытия
        if (event.target.classList.contains('popup__icon-close-image')) closePopup(popup)
    })
})


//Попап редактирования профиля

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


//Попап создания карточки

profileButton.addEventListener('click', function () {
    openPopup(cardPopup);
});

// Добавление карточек
function createCard(card) {
    const cardTemplate = document.querySelector('#elements').content;
    const cardElement = cardTemplate.querySelector('.element').cloneNode(true);
    const cardImage = cardElement.querySelector('.element__image');
    const cardTitle = cardElement.querySelector('.element__title');
    cardImage.src = card.link;
    cardTitle.textContent = card.name;

    // Реализуем лайки
    const addLike = cardElement.querySelector('.element__button')
    addLike.addEventListener('click', function (event) {
        event.target.classList.toggle('element__button_active');
    })

    //Реализуем удаление карточки при клике на trash
    const trashButton = cardElement.querySelector('.element__trash-button')
    trashButton.addEventListener('click', function () {
        const item = trashButton.closest('.element');
        item.remove();
    })

    //Реализуем открытие картинки-попапа
    const img = cardElement.querySelector('.element__image')
    img.addEventListener('click', function () {
        openPopup(imagePopup);
        popupImage.src = card.link;
        popupDescription.textContent = card.name;
    })

    return cardElement;
}

function addCard(newCard) {
    cardElements.prepend(newCard);
}

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
    inputLink.value = null
    inputLocation.value = null

});
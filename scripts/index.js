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
const allPopups = Array.from(document.querySelectorAll('.popup')); // нашли все попапы на странице

let openedPopup = null

/**
 * Общая функция закрытия попапа
 * @param {Element} popup
 */
function closePopup(popup) {
    popup.classList.remove('popup_opened');
    openedPopup = null
}

/**
 * Общая функция отрытия попапа
 * @param {Element} popup
 */
function openPopup(popup) {
    popup.classList.add('popup_opened');
    openedPopup = popup
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
    cardTitle.textContent = card.name;

    //Реализуем открытие картинки-попапа
    const img = cardElement.querySelector('.element__image')
    img.addEventListener('click', function () {
        openPopup(imagePopup);
        popupImage.src = card.link;
        popupDescription.textContent = card.name;
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

// Закрываем попап на крестик и на overlay
allPopups.forEach(function (popup) {
    // на каждый попап устанавливает слушатель события клик
    popup.addEventListener('click', function (event) {
        // далее проверяем наличие класса кнопку закрытия.
        // Закрываем попап на крестик
        if (event.target.classList.contains('popup__icon-close-image')) {
            closePopup(popup)
        }
        // Закрываем попап на overlay
        if (event.target === event.currentTarget) {
            closePopup(popup)
        }
    })
})


// Закрываем попап на клавишу Escape
document.addEventListener('keydown', function (event) {
    if (openedPopup !== null && event.key === 'Escape') {
        closePopup(openedPopup)
    }
})

// Попап редактирования профиля
profileForm.addEventListener('submit', function (event) {
    event.preventDefault();
    profileTitle.textContent = inputUserName.value;
    profileSubtitle.textContent = inputUserProfession.value;
    closePopup(profilePopup);
});

// Открываем попап и добавляем текст из профиля в попап
profileEditButton.addEventListener('click', function () {
    inputUserName.value = profileTitle.textContent;
    inputUserProfession.value = profileSubtitle.textContent;
    openPopup(profilePopup);
});

//Попап создания карточки
profileButton.addEventListener('click', function () {
    openPopup(cardPopup);
});

// Реализуем лайки и удаление карточки при клике на trash
cardElements.addEventListener('click', function (event) {
    if (event.target.classList.contains('element__button')) {
        event.target.classList.toggle('element__button_active');
    }

    if (event.target.classList.contains('element__trash-button')) {
        event.target.closest('.element').remove();
    }
})

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




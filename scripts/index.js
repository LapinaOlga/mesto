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

let openedPopup = null


// Общая функция закрытия попапа
function closePopup(popup) {
    popup.classList.remove('popup_opened');
    openedPopup = null
}

// Общая функция открытия попапа
function openPopup(popup) {
    popup.classList.add('popup_opened');
    openedPopup = popup
}

//Закрываем попап на крестик и оверлэй
const allPopups = Array.from(document.querySelectorAll('.popup')); // нашли все попапы на странице
allPopups.forEach(function (popup) {
    popup.addEventListener('click', function (event) { // на каждый попап устанавливает слушатель события клик
        // далее проверяем наличие класса кнопку закрытия.
        // Если класс кнопки (в вашем случае изображения) есть, то закрываем попап общей функцией закрытия
        if (event.target.classList.contains('popup__icon-close-image') || event.target === popup) closePopup(popup)
    })
})

//Закрываем попап на клавишу Escape

document.addEventListener('keydown', function (event) {
    if (openedPopup !== null && event.key === 'Escape') {
        closePopup(openedPopup)
    }
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

// ВАЛИДАЦИЯ //
// Функция, которая добавляет класс с ошибкой
const showError = (formSelector, inputElement, errorMessage, inputErrorClass, errorClass) => {
    const errorElement = inputElement.parentNode.getElementsByClassName(errorClass)[0];
    inputElement.classList.add(inputErrorClass);
    if (errorElement) {
        errorElement.textContent = errorMessage;
    }
};

// Функция, которая удаляет класс с ошибкой
const hideError = (formSelector, inputSelector, inputErrorClass, errorClass) => {
    const errorElement = inputSelector.parentNode.getElementsByClassName(errorClass)[0];
    inputSelector.classList.remove(inputErrorClass);
    errorElement.textContent = ' ';
};

// Функция, которая проверяет валидность поля
const isValid = (formSelector, inputSelector, inputErrorClass, errorClass) => {
    if (!inputSelector.validity.valid) {
        // Если поле не проходит валидацию, покажем ошибку
        showError(formSelector, inputSelector, inputSelector.validationMessage, inputErrorClass, errorClass);
    } else {
        // Если проходит, скроем
        hideError(formSelector, inputSelector, inputErrorClass, errorClass);
    }
};

//Добавляем слушатели форме и ее полям
function setEventListeners(formSelector, inputErrorClass, errorClass, inputSelector) {
    const popupItemList = Array.from(formSelector.querySelectorAll(inputSelector))
    popupItemList.forEach(function (inputSelector) {
        inputSelector.addEventListener('input', function () {
            isValid(formSelector, inputSelector, inputErrorClass, errorClass);
        });
    });
}

function enableValidation({
                              formSelector,
                              inputSelector,
                              submitButtonSelector,
                              inactiveButtonClass,
                              inputErrorClass,
                              errorClass,
                          }) {
    const popupList = Array.from(document.querySelectorAll(formSelector));
    popupList.forEach(function (popupElement) {
        popupElement.addEventListener('submit', function (event) {
            event.preventDefault();
        });
        setEventListeners(popupElement, inputErrorClass, errorClass, inputSelector, formSelector)
    });
}

const hasInvalidInput = function() {
    // проходим по этому массиву методом some
    return inputList.some((inputSelector) => {
        // Если поле не валидно, колбэк вернёт true
        // Обход массива прекратится и вся функция
        // hasInvalidInput вернёт true

        return !inputSelector.validity.valid;
    })
};

const toggleButtonState = function (inputList, submitButtonSelector, inactiveButtonClass) {
    if (hasInvalidInput(inputList)) {
        submitButtonSelector.classList.add(inactiveButtonClass);
    } else {
        submitButtonSelector.classList.remove(inactiveButtonClass);
    }
}

// Добавление карточек
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

// Реализуем лайки и удаление карточки при клике на trash

cardElements.addEventListener('click', function (event) {
    if (event.target.classList.contains('element__button')) {
        event.target.classList.toggle('element__button_active');
    }

    if (event.target.classList.contains('element__trash-button')) {
        event.target.closest('.element').remove();
    }

})

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




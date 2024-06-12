import { popupTypeImages, popupElements, popupTypeEdit, popupTypeNewCard } from '../index.js';




//Закрытие модального окна карточки при нажатии на крестик
export function closeModalImage(evt) {
    popupTypeImages.forEach((evt) => {
      evt.classList.remove('popup_is-opened');
    });
}

//Закрытие модального окна карточки клавишей Esc
export function handleEscCloseImage(evt) {
    if (evt.key === 'Escape') {
      popupElements.forEach((item) => {
        item.classList.remove('popup_is-opened');
      });
    }
}

//Закрытие модального окна при нажатии вне контента
export function handleOutside(evt) {
    evt.target.classList.toggle('popup_is-opened');
}

//закрытие модального окна редакции профиля при нажатии esc
export function handleEscCloseEdit(evt) {
    if (evt.key === 'Escape') {
      popupTypeEdit.classList.remove('popup_is-opened');
    }
}

//закрытие модального окна добавления карточки при нажатии esc
export function handleEscCloseAddCard(evt) {
    if (evt.key === 'Escape') {
      popupTypeNewCard.classList.remove('popup_is-opened');
    }
}

//Закрытие модального окна редакции профиля при нажатии на крестик
export function closeEditProfile() {
    popupTypeEdit.classList.remove('popup_is-opened');
}

//Закрытие модального окна добавления карточки при нажатии крестик
export function closeAddCard() {
    popupTypeNewCard.classList.remove('popup_is-opened');
}
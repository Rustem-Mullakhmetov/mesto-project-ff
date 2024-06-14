import { popupElements } from "../index.js";

//Закрытие модального окна при нажатии вне контента
export function handleOutside(evt) {
    evt.target.classList.toggle('popup_is-opened');
}

//Закрытие модальных окон при нажатии Esc
export function handleEscClose (evt) {
  if (evt.key === 'Escape') {
    closeModal();
  }
}

//Закрытие модальных окон при нажатии на крестик
export function closeModal() {
  popupElements.forEach((item) => {
    item.classList.remove('popup_is-opened');
  })
}

//Открытие модальных окон
export function openModal(item) {
  item.classList.add('popup_is-opened');
}

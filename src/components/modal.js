
//Закрытие модального окна при нажатии вне контента
export function handleOutside(evt) {
  const popupOpen = document.querySelector('.popup_is-opened');
  if (evt.target.classList.contains('popup_is-opened')) {
    closeModal(popupOpen);
  }
  
}

//Закрытие модальных окон при нажатии Esc
export function handleEscClose (evt) {
  const popupOpen = document.querySelector('.popup_is-opened');
  if (evt.key === 'Escape') {
    closeModal(popupOpen);
  }
}

//Закрытие модальных окон при нажатии на крестик
export function closeModal(item) {
  item.classList.remove('popup_is-opened'); 
}

//Открытие модальных окон
export function openModal(item) {
  document.addEventListener('keydown', handleEscClose);
  item.classList.add('popup_is-opened');
}

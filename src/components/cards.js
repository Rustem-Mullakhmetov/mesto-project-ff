import {card, openModalImage} from '../index.js';

export const initialCards = [
    {
      name: "Архыз",
      link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg",
    },
    {
      name: "Челябинская область",
      link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg",
    },
    {
      name: "Иваново",
      link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg",
    },
    {
      name: "Камчатка",
      link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg",
    },
    {
      name: "Холмогорский район",
      link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg",
    },
    {
      name: "Байкал",
      link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg",
    }
];

// Вывод карточек на страницу
export function createCard({name, link}, deleteCard, likeButton) {
  const cardElement = card.querySelector('.places__item').cloneNode(true);
  const cardLink = link;
  const cardName = name;
  cardElement.querySelector('.card__image').src = cardLink;
  cardElement.querySelector('.card__image').alt = cardName;
  cardElement.querySelector('.card__title').textContent = cardName;
  const deleteButton = cardElement.querySelector('.card__delete-button');
  deleteButton.addEventListener('click', deleteCard);
  cardElement.querySelector('.card__image').addEventListener('click', () => openModalImage(name, link));
  cardElement.querySelector('.card__like-button').addEventListener('click', likeButton);
  return cardElement;
}

// Удаление карточки
export function deleteCard(event) {
  const cardDelete = event.target.closest('.card');
  cardDelete.remove();
}

//Like
export function likeButton(evt) {
  evt.target.classList.toggle('card__like-button_is-active');
}
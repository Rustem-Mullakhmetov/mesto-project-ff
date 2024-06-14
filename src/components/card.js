import {card} from '../index.js';

// Вывод карточек на страницу
export function createCard({name, link}, deleteCard, likeButton, openModalImage) {
    const cardElement = card.querySelector('.places__item').cloneNode(true);
    const cardLink = link;
    const cardName = name;
    const imageCard = cardElement.querySelector('.card__image');
    cardElement.querySelector('.card__image').src = cardLink;
    cardElement.querySelector('.card__image').alt = cardName;
    cardElement.querySelector('.card__title').textContent = cardName;
    const deleteButton = cardElement.querySelector('.card__delete-button');
    deleteButton.addEventListener('click', deleteCard);
    imageCard.addEventListener('click', () => openModalImage(name, link));
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
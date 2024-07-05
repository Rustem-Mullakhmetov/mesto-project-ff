import {card} from '../index.js';
import { deleteCardId, deleteLikeCard, addLikeCard } from './api.js';

export function createCard(cardInfo, deleteCard, handleLikes, openModalImage, userId) {
  const cardElement = card.querySelector('.places__item').cloneNode(true);
  const cardLink = cardInfo.link;
  const cardName = cardInfo.name;
  const imageCard = cardElement.querySelector('.card__image');
  const cardLikeButton = cardElement.querySelector(".card__like-button");
  const cardLikeCounter = cardElement.querySelector(".card__like-counter");
  cardLikeCounter.textContent = cardInfo.likes.length;
  cardElement.querySelector('.card__image').src = cardLink;
  cardElement.querySelector('.card__image').alt = cardName;
  cardElement.querySelector('.card__title').textContent = cardName;
  const deleteButton = cardElement.querySelector('.card__delete-button');
  //Ставим слушатель удаления карточки, если пользователь является владельцем
  if (userId !== cardInfo.owner._id) {
    deleteButton.style.display = 'none';
  } else {
    deleteButton.addEventListener('click', () => {
      const cardId = cardInfo._id;
      deleteCard(cardElement, cardId);
    });
  }

 // Проверка наличия лайка пользователя в массиве likes
 const isLiked = cardInfo.likes.some((like) => like._id === userId);
 if (isLiked) {
   cardLikeButton.classList.add("card__like-button_is-active");
 }
 // Слушатель лайка
 cardLikeButton.addEventListener("click", () => {
   handleLikes(cardLikeCounter, cardLikeButton, cardInfo);
 });

  imageCard.addEventListener('click', () => openModalImage(cardName, cardLink));
  return cardElement;
}

// Функция подсчета лайков
export function handleLikes(cardLikeCounter, cardLikeButton, cards) {
  if (cardLikeButton.classList.contains("card__like-button_is-active")) {
    // Пользователю уже понравилась карточка, поэтому выполните операцию "не нравится".
    deleteLikeCard(cards._id)
    .then((res) => {
      cardLikeButton.classList.toggle("card__like-button_is-active");
      cardLikeCounter.textContent = res.likes.length;
    })
    .catch((err) => {
      console.error("Произошла ошибка при удалении лайка:", err);
    });
  } else {
    // понравилась карта, поэтому выполните аналогичную операцию
    addLikeCard(cards._id)
    .then((res) => {
      cardLikeButton.classList.toggle("card__like-button_is-active");
      cardLikeCounter.textContent = res.likes.length;
    })
    .catch((err) => {
      console.error("Произошла ошибка при добавлении лайка:", err);
    });
  }
}
  
// Функция удаления карточки
export function deleteCard(selectedCard, id) {
  deleteCardId(id)// Отправляем запрос на сервер для удаления карточки
    .then(() => {
      // Удаляем карточку из DOM после успешного удаления
      selectedCard.remove();
      // Закрываем попап после успешного удаления
      //closePopupDelete();
    })
    .catch((err) => {
      console.error("Произошла ошибка при удалении карточки:", err);
    });
}

  //Like
  export function likeButton(evt) {
    evt.target.classList.toggle('card__like-button_is-active');
  }
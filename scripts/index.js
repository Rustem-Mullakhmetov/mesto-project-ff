const cardContainer = document.querySelector('.places__list');
const card = document.querySelector('#card-template').content;
// Добавление карточки
function createCard({name, link}, deleteCard) {
  const cardElement = card.querySelector('.places__item').cloneNode(true);
  const cardLink = link;
  const cardName = name;
  cardElement.querySelector('.card__image').src = cardLink;
  cardElement.querySelector('.card__image').alt = cardName;
  cardElement.querySelector('.card__title').textContent = cardName;
  const deleteButton = cardElement.querySelector('.card__delete-button');
  deleteButton.addEventListener('click', deleteCard);
  return cardElement;
}
// Удаление карточки
function deleteCard(event) {
  const cardDelete = event.target.closest('.card');
  cardDelete.remove();
}
//Вывод карточек на страницу
initialCards.forEach((item) => {
  cardContainer.append(createCard(item, deleteCard));
});
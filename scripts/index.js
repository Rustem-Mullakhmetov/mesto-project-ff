const cardContainer = document.querySelector('.places__list');
const card = document.querySelector('#card-template').content;

function createCard(value) {
  const cardElement = card.querySelector('.places__item').cloneNode(true);
  const link = value.link;
  const name = value.name;
  cardElement.querySelector('.card__image').src = link;
  cardElement.querySelector('.card__image').alt = name;
  cardElement.querySelector('.card__title').textContent = name;
  cardElement.querySelector('.card__delete-button').addEventListener('click', function (event) {
    deleteCard(event);
  });
  return cardElement
}

function deleteCard(value) {
  const cardDelete = value.target.closest('.card');
  cardDelete.remove();
}

initialCards.forEach((item) => {
  cardContainer.append(createCard(item));
});

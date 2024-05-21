const cardTemplate = document.querySelector('.places__list');
const card = document.querySelector('#card-template').content;

initialCards.forEach(function (item) {
    const cardElement = card.querySelector('.places__item').cloneNode(true);
    cardElement.querySelector('.card__image').src = item.link;
    cardElement.querySelector('.card__image').alt = item.name;
    cardElement.querySelector('.card__title').textContent = item.name;
    cardElement.querySelector('.card__delete-button').addEventListener('click', function (event) {
      const cardDelete = event.target.closest('.card');
      cardDelete.remove();
    });
    cardTemplate.append(cardElement);
});

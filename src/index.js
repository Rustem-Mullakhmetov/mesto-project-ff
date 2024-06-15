import './pages/index.css';
import {initialCards as inCards} from './components/cards.js';
import {createCard, deleteCard, likeButton} from './components/card.js';
import {openModal, handleOutside, closeModal,handleEscClose} from './components/modal.js';

const cardContainer = document.querySelector('.places__list');
export const card = document.querySelector('#card-template').content;
export const popupTypeEdit = document.querySelector('.popup_type_edit');
export const popupTypeNewCard = document.querySelector('.popup_type_new-card');
export const popupTypeImage = document.querySelector('.popup_type_image');
const popupCloseEditProfile = document.querySelector('.popup_type_edit .popup__close');
const popupCloseAddCard = document.querySelector('.popup_type_new-card .popup__close');
export const popupElements = document.querySelectorAll('.popup');
const editButton = document.querySelector('.profile__edit-button');
const buttonOpenPopupCard = document.querySelector('.profile__add-button');
const formElement = document.querySelector('.popup__form');
const nameInput = document.querySelector('.popup__input_type_name');
const jobInput = document.querySelector('.popup__input_type_description');
const profileName = document.querySelector('.profile__title');
const profileDescription = document.querySelector('.profile__description');
const cardName = document.querySelector('.popup__caption');
const cardLink = document.querySelector('.popup__image');
const formElementCard = document.forms.new_place;
const cardPlace = formElementCard.elements.place_name;
const cardImageLink = formElementCard.elements.link;

//слушатели закрытия по кнопкам
document.addEventListener('keydown', handleEscClose);
popupCloseEditProfile.addEventListener('click', () => closeModal(popupTypeEdit));
popupTypeEdit.addEventListener('click', handleOutside);
popupTypeNewCard.addEventListener('click', handleOutside);
popupCloseAddCard.addEventListener('click', () => closeModal(popupTypeNewCard));
popupTypeImage.querySelector('.popup__close').addEventListener('click', () => closeModal(popupTypeImage));
popupTypeImage.addEventListener('click', handleOutside);
formElementCard.addEventListener('submit', handleCardFormSubmit);
formElement.addEventListener('submit', handleProfileFormSubmit);

//Отправка формы при добавлении карты
function handleCardFormSubmit(evt) {
  evt.preventDefault();
  const cardElement = createCard({name: cardPlace.value, link: cardImageLink.value}, deleteCard, likeButton);
  cardContainer.prepend(cardElement);
  formElementCard.reset();
  closeModal(popupTypeNewCard);
}

//Отправка формы при редакции профиля
function handleProfileFormSubmit(evt) {
  evt.preventDefault();
  profileName.textContent = nameInput.value;
  profileDescription.textContent = jobInput.value;
  closeModal(popupTypeEdit);
}

//Навешиваем анимацию на каждый попап
popupElements.forEach((item) => {
  item.classList.add('popup_is-animated');
});

//Вывод карточек на страницу
inCards.forEach((item) => {
  cardContainer.append(createCard(item, deleteCard, likeButton, openModalImage));
});

//клик на кнопку редактировать профиль
editButton.addEventListener('click', editProfile);

//клик на кнопку создания карточки
buttonOpenPopupCard.addEventListener('click', addCard);

//Функция редакции профиля
function editProfile() {
  openModal(popupTypeEdit);
  nameInput.value = profileName.textContent;
  jobInput.value = profileDescription.textContent;
}

//Функция добавления карточки
function addCard(){
  openModal(popupTypeNewCard);
}

//Нажатие на карточку, вывод модального окна
export function openModalImage(name, link) {
  openModal(popupTypeImage);
  cardName.textContent = name;
  cardLink.src = link;
}

import './pages/index.css';
import {initialCards as inCards, createCard, deleteCard, likeButton} from './components/cards.js';
import {closeModalImage, handleOutside, handleEscCloseImage, handleEscCloseEdit, handleEscCloseAddCard, closeEditProfile, closeAddCard} from './components/modal.js';

const cardContainer = document.querySelector('.places__list');
export const card = document.querySelector('#card-template').content;
export const popupTypeEdit = document.querySelector('.popup_type_edit');
export const popupTypeNewCard = document.querySelector('.popup_type_new-card');
export const popupTypeImages = document.querySelectorAll('.popup_type_image');
const popupCloseEditProfile = document.querySelector('.popup_type_edit .popup__close');
const popupCloseAddCard = document.querySelector('.popup_type_new-card .popup__close');
export const popupElements = document.querySelectorAll('.popup');
const editButton = document.querySelector('.profile__edit-button');
const addCardButton = document.querySelector('.profile__add-button');

//Вывод карточек на страницу
inCards.forEach((item) => {
  cardContainer.append(createCard(item, deleteCard, likeButton));
});

//клик на кнопку редактировать профиль
editButton.addEventListener('click', editProfile);

//клик на кнопку создания карточки
addCardButton.addEventListener('click', addCard);

//Функция редакции профиля
function editProfile() {
  popupTypeEdit.classList.add('popup_is-animated');
  popupTypeEdit.classList.add('popup_is-opened');
  popupTypeEdit.addEventListener('click', handleOutside);
  document.addEventListener('keydown', handleEscCloseEdit);
  popupCloseEditProfile.addEventListener('click', closeEditProfile);
  const formElement = document.querySelector('.popup__form');
  const nameInput = document.querySelector('.popup__input_type_name');
  const jobInput = document.querySelector('.popup__input_type_description');
  const profileName = document.querySelector('.profile__title');
  const profileDescription = document.querySelector('.profile__description');
  nameInput.value = profileName.textContent;
  jobInput.value = profileDescription.textContent;
  
  function handleFormSubmit(evt) {
    evt.preventDefault();
    profileName.textContent = nameInput.value;
    profileDescription.textContent = jobInput.value;
    popupTypeEdit.classList.remove('popup_is-opened');
  }

  formElement.addEventListener('submit', handleFormSubmit);
}

//Функция добавления карточки
function addCard(){
  popupTypeNewCard.classList.add('popup_is-animated');
  popupTypeNewCard.classList.add('popup_is-opened');
  popupTypeNewCard.addEventListener('click', handleOutside);
  document.addEventListener('keydown', handleEscCloseAddCard);
  popupCloseAddCard.addEventListener('click', closeAddCard);
  const formElementCard = document.forms.new_place;
  const cardPlace = formElementCard.elements.place_name;
  const cardImageLink = formElementCard.elements.link;
  function handleCardFormSubmit(evt) {
    evt.preventDefault();
    const cardElement = createCard({name: cardPlace.value, link: cardImageLink.value}, deleteCard, likeButton);
    cardContainer.prepend(cardElement);
    formElementCard.reset();
    popupTypeNewCard.classList.remove('popup_is-opened');
  }
  formElementCard.addEventListener('submit', handleCardFormSubmit);
}


//Нажатие на карточку, вывод модального окна
export function openModalImage(name, link) {
  popupTypeImages.forEach((item) => {
    item.classList.add('popup_is-animated');
    item.classList.add('popup_is-opened');
    const nameInput = document.querySelector('.popup__caption');
    nameInput.textContent = name;
    const jobInput = document.querySelector('.popup__image');
    jobInput.src = link;
  });
  popupTypeImages.forEach((item) => {
    item.querySelector('.popup__close').addEventListener('click', closeModalImage);
    item.addEventListener('click', handleOutside);
  });
  document.addEventListener('keydown', handleEscCloseImage);
}












 
 


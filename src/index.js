import './pages/index.css';
import {createCard, deleteCard, handleLikes} from './components/card.js';
import {openModal, handleOutside, closeModal} from './components/modal.js';
import { enableValidation, clearValidation } from './components/validation.js';
import { getCards, getUser, addNewCard, updateAvatar } from './components/api.js';

const cardContainer = document.querySelector('.places__list');
export const card = document.querySelector('#card-template').content;
export const popupTypeEdit = document.querySelector('.popup_type_edit');
export const popupTypeNewCard = document.querySelector('.popup_type_new-card');
export const popupTypeImage = document.querySelector('.popup_type_image');
const popupCloseEditProfile = document.querySelector('.popup_type_edit .popup__close');
const popupCloseAddCard = document.querySelector('.popup_type_new-card .popup__close');
const popupCloseAvatar = document.querySelector('.popup_type_avatar .popup__close');
export const popupElements = document.querySelectorAll('.popup');
const editButton = document.querySelector('.profile__edit-button');
const buttonOpenPopupCard = document.querySelector('.profile__add-button');
export const formElement = document.querySelector('.popup__form');
const avatarForm = document.querySelector('.popup_type_avatar');
const nameInput = document.querySelector('.popup__input_type_name');
const jobInput = document.querySelector('.popup__input_type_description');
export const deletePopup = document.querySelector('.popup__type_delete-card');
const profileName = document.querySelector('.profile__title');
const profileDescription = document.querySelector('.profile__description');
const avatarImage = document.querySelector('.profile__image');
const cardName = document.querySelector('.popup__caption');
const cardLink = document.querySelector('.popup__image');
export const formInput = document.querySelector('.popup__input');
const formElementCard = document.forms.new_place;
const cardPlace = formElementCard.elements.place_name;
const avatarFormElement = document.forms.edit_avatar;
const cardImageLink = formElementCard.elements.link;
const validationConfig = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible'
}

//слушатели закрытия по кнопкам
popupCloseEditProfile.addEventListener('click', () => closeModal(popupTypeEdit));
popupTypeEdit.addEventListener('click', handleOutside);
popupTypeNewCard.addEventListener('click', handleOutside);
popupCloseAddCard.addEventListener('click', () => closeModal(popupTypeNewCard));
popupTypeImage.querySelector('.popup__close').addEventListener('click', () => closeModal(popupTypeImage));
popupTypeImage.addEventListener('click', handleOutside);
formElementCard.addEventListener('submit', handleCardFormSubmit);
formElement.addEventListener('submit', handleProfileFormSubmit);
popupCloseAvatar.addEventListener('click', () => closeModal(avatarForm));
avatarForm.addEventListener('click', handleOutside);
avatarFormElement.addEventListener('submit', handleAvatarFormSubmit);

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

// включение валидации вызовом enableValidation
// все настройки передаются при вызове
enableValidation(validationConfig);


// Установка слушателя на кнопку открытия формы изменения аватара
avatarImage.addEventListener("click", () => {
  clearValidation(avatarForm, validationConfig);
  openModal(avatarForm);
});

// Функция для установки информации о пользователе на страницу
let userId = "";
function setUserInfo(user) {
  profileName.textContent = user.name;
  profileDescription.textContent = user.about;
  avatarImage.setAttribute(
    "style",
    `background-image: url('${user.avatar}')`
  );
  userId = user._id;
}

//Редакция автара
function popupAvatar() {
  clearValidation(avatarForm, validationConfig);
  avatarFormElement.reset();
  openModal(avatarForm);
}

//Функция редакции профиля
function popupProfile() {
  clearValidation(popupTypeEdit, validationConfig);
  openModal(popupTypeEdit);
  nameInput.value = profileName.textContent;
  jobInput.value = profileDescription.textContent;
}

//Функция открытия формы добавления карточки
function addCard(){
  clearValidation(popupTypeNewCard, validationConfig);
  formElementCard.reset();
  openModal(popupTypeNewCard);
}

//Нажатие на карточку, вывод модального окна
export function openModalImage(name, link) {
  openModal(popupTypeImage);
  cardName.textContent = name;
  cardLink.src = link;
  cardLink.alt = name;
}

//Вывод карточек на страницу
export function renderCards(cards, deleteCard, handleLikes, openModalImage, userId) {
  cardContainer.innerHTML = "";
  cards.forEach((card) => {
    cardContainer.append(createCard(card, deleteCard, handleLikes, openModalImage, userId));
  });
}

//Отправка формы при добавлении карты
function handleCardFormSubmit(evt) {  
  evt.preventDefault();
  function makeRequest() {
    return addNewCard(cardPlace.value, cardImageLink.value)
      .then((card) => {
        const newCardElement = createCard(card, deleteCard, handleLikes, openModal, userId);
        cardContainer.prepend(newCardElement);
        formElementCard.reset();
        closeModal(popupTypeNewCard);
      });
  }
  handleSubmit(makeRequest, evt);
}

// Функция для обработки отправки формы добавления аватара
export function handleAvatarFormSubmit(evt) {
  // Функция для отправки запроса на сервер
  evt.preventDefault();
  function makeRequest() {
    const avatar = avatarFormElement.elements.avatar_link.value;
    return updateAvatar(avatar)
      .then((res) => {
        avatarImage.setAttribute("style", `background-image: url('${res.avatar}')`);
        closeModal(avatarForm);
      });
  }
  // Обработка отправки формы с использованием вспомогательной функции
  handleSubmit(makeRequest, evt);
}

//клик на кнопку редактировать профиль
editButton.addEventListener('click', popupProfile);
//клик на кнопку создания карточки
buttonOpenPopupCard.addEventListener('click', addCard);
//клик на аватар
avatarImage.addEventListener('click', popupAvatar)

// Универсальная функция, которая принимает функцию запроса, объект события и текст во время загрузки
export function handleSubmit(request, evt) {
  evt.preventDefault();
  const loadingText = "Сохранение...";
  const submitButton = evt.submitter;
  const initialText = submitButton.textContent;
  renderLoading(true, submitButton, initialText, loadingText);

  // Выполнение запроса
  request()
    .then(() => {
      evt.target.reset(); // Сброс формы после успешной отправки
    })
    .catch((err) => {
      console.error(`Ошибка: ${err}`);
    })
    .finally(() => {
      renderLoading(false, submitButton, initialText, loadingText); // Возврат исходного текста кнопки
    });
}

//отправка формы редакции аватара на сервер
avatarFormElement.addEventListener("submit", handleAvatarFormSubmit);

// Функция для управления текстом кнопки во время загрузки
function renderLoading(isLoading, button) {
  const initialText = "Сохранить";
  const loadingText = "Сохранение...";
  if (isLoading) {
    button.textContent = loadingText;
  } else {
    button.textContent = initialText;
  }
}

// Выполнение запросов на сервер для получения информации о пользователе и карточек
Promise.all([getUser(), getCards()])
  .then(([user, cards]) => {
    setUserInfo(user);
    renderCards(cards, deleteCard, handleLikes, openModalImage, user._id);
  })
  .catch((err) => {
    console.error("Произошла ошибка при получении данных:", err);
  });
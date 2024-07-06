//ссылка на сайт
const baseURL = 'https://mesto.nomoreparties.co/v1/wff-cohort-17';

// Заголовки запроса
const headers = {
  Authorization: 'f12195b9-14a0-466d-b62a-2d0a17a72cf2',
  'Content-Type': 'application/json'
};

// Объект с маршрутами API
const routesApi = {
  user: 'users/me',
  cards: 'cards',
  likes: 'likes'
};

// Функция для проверки данных
const checkData = (data) => {
  if (data.ok) {
    return data.json();
  } else {
    return Promise.reject(`Ошибка: ${data.status}`);
  }
};

// Функция для отправки запроса
export function request(endpoint, options) {
  return fetch(`${baseURL}/${endpoint}`, options).then(checkData);
}

// Получение всех карточек
export const getCards = () => {
  return request(routesApi.cards, {
    method: "GET",
    headers
  });
};

// Добавление новой карточки
export const addNewCard = (name, link) => {
  return request(routesApi.cards, {
    method: "POST",
    headers,
    body: JSON.stringify({
      name,
      link
    }),
  });
};

// Удаление карточки по идентификатору
export const deleteUserCard = (id) => {
  return request(`${routesApi.cards}/${id}`, {
    method: "DELETE",
    headers
  });
};

// Получение информации о пользователе
export const getUser = () => {
  return request(routesApi.user, {
    method: "GET",
    headers
  });
};

// Обновление информации о пользователе
export const updateUser = (name, about) => {
  return request(routesApi.user, {
    method: "PATCH",
    headers,
    body: JSON.stringify({
      name,
      about
    })
  });
};

// Обновление аватара пользователя
export const updateAvatar = (avatar) => {
  return request(`${routesApi.user}/avatar`, {
    method: "PATCH",
    headers,
    body: JSON.stringify({ avatar }),
  });
};

// Добавление лайка карточке
export const addLikeCard = (id)  => {
  return request(`${routesApi.cards}/${routesApi.likes}/${id}`, {
    method: "PUT",
    headers
  });
};

// Удаление лайка с карточки
export const deleteLikeCard = (id) => {
  return request(`${routesApi.cards}/${routesApi.likes}/${id}`, {
    method: "DELETE",
    headers
  });
};
  
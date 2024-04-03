import { setTokens, getTokens } from "./persistant-token";

// 1 раз объявляем базовый урл
export const BASE_URL = "https://norma.nomoreparties.space/api/";

// создаем функцию проверки ответа на `ok`
const checkResponse = (res) => {
  if (res.ok) {
    return res.json();
  }
  // не забываем выкидывать ошибку, чтобы она попала в `catch`
  return Promise.reject(`Ошибка ${res.status}`);
};

// создаем функцию проверки на `success`
const checkSuccess = (res) => {
  if (res && res.success) {
    return res;
  }
  // не забываем выкидывать ошибку, чтобы она попала в `catch`
  return Promise.reject(`Ответ не success: ${res}`);
};

// создаем универсальную фукнцию запроса с проверкой ответа и `success`
// В вызов приходит `endpoint`(часть урла, которая идет после базового) и опции
export const request = (endpoint, options) => {
  // а также в ней базовый урл сразу прописывается, чтобы не дублировать в каждом запросе
  return fetch(`${BASE_URL}${endpoint}`, options)
    .then(checkResponse)
    .then(checkSuccess);
};

export const refreshToken = async () => {
  try {
    const response = await fetch(`${BASE_URL}auth/token`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json;charset=utf-8",
      },
      body: JSON.stringify({
        token: getTokens().refreshToken,
      }),
    });
    const refreshData = await checkResponse(response);
    if (!refreshData.success) {
      return Promise.reject(refreshData);
    }
    setTokens({ accessToken: refreshData.accessToken, refreshToken: refreshData.refreshToken });
    return refreshData;
  } catch (err) {
    return Promise.reject(err);
  }
};

export const fetchWithRefresh = async (endpoint, options) => {
  try {
    const fullUrl = `${BASE_URL}${endpoint}`;
    const response = await fetch(fullUrl, options);
    return await checkResponse(response);
  } catch (err) {
    try {
      if (err.message === "jwt expired") {
        const refreshData = await refreshToken(); //обновляем токен
        options.headers.authorization = refreshData.accessToken;
        const fullUrl = `${BASE_URL}${endpoint}`; // Define fullUrl again
        const response = await fetch(fullUrl, options); //повторяем запрос
        return await checkResponse(response);
      } else {
        return Promise.reject(err);
      }
    } catch (refreshErr) {
      return Promise.reject(refreshErr);
    }
  }
};
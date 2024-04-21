import { setTokens, getTokens } from "./persistant-token";

// 1 раз объявляем базовый урл
export const BASE_URL: string = "https://norma.nomoreparties.space/api/";

export type TResponseDataAPI<T extends Record<string, any> = {}> = {
  success: boolean;
} & T;

// создаем функцию проверки ответа на `ok`
const checkResponse = <T extends TResponseDataAPI>(
  res: Response
): Promise<T> => {
  if (res.ok) {
    return res.json();
  }
  // не забываем выкидывать ошибку, чтобы она попала в `catch`
  return Promise.reject(`Ошибка ${res.status}`);
};

// создаем функцию проверки на `success`
const checkSuccess = <T extends TResponseDataAPI>(res: T): Promise<T> => {
  if (res && res.success) {
    return Promise.resolve(res);
  }
  // не забываем выкидывать ошибку, чтобы она попала в `catch`
  return Promise.reject(`Ответ не success: ${res}`);
};

// создаем универсальную фукнцию запроса с проверкой ответа и `success`
// В вызов приходит `endpoint`(часть урла, которая идет после базового) и опции
export const request = <T>(
  endpoint: string,
  options?: RequestInit
): Promise<T> => {
  // а также в ней базовый урл сразу прописывается, чтобы не дублировать в каждом запросе
  return fetch(`${BASE_URL}${endpoint}`, options)
    .then((response) => response.json())
    .then(checkSuccess);
};

export const refreshToken = async (): Promise<any> => {
  try {
    const response = await fetch(
      `${process.env.REACT_APP_API_URL}/auth/token`,
      {
        method: "POST",
        body: JSON.stringify({
          token: getTokens()?.refreshToken,
        }),
        headers: {
          "Content-Type": "application / json; charset = utf-8",
        },
      }
    );
    const refreshData = await checkResponse<{
      success: boolean;
      error: string;
      accessToken: string;
      refreshToken: string;
    }>(response);
    if (!refreshData.success) {
      throw new Error(refreshData.error);
    }
    setTokens({
      accessToken: refreshData?.accessToken,
      refreshToken: refreshData?.refreshToken,
    });
    return refreshData;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const fetchWithRefresh = async (
  endpoint: string,
  options: any
): Promise<any> => {
  try {
    const fullUrl = `${BASE_URL}${endpoint}`;
    const response = await fetch(fullUrl, options);
    return await checkResponse(response);
  } catch (err: any) {
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
    } catch (refreshErr: any) {
      return Promise.reject(refreshErr);
    }
  }
};

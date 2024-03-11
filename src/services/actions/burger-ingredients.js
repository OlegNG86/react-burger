export const GET_INGREDIENTS_REQUEST = "GET_INGREDIENTS_REQUEST";
export const GET_INGREDIENTS_SUCCESS = "GET_INGREDIENTS_SUCCESS";
export const GET_INGREDIENTS_FAILED = "GET_INGREDIENTS_FAILED";

const API_URL = "https://norma.nomoreparties.space/api/ingredients";

export function getIngredients() {
  return function (dispatch) {
    dispatch({
      type: GET_INGREDIENTS_REQUEST,
    });

    fetch(API_URL)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Ошибка при получении данных");
        }
        return response.json();
      })
      .then((responseData) => {
        if (!responseData.success) {
          throw new Error("Ошибка при получении данных");
        }
        dispatch({
          type: GET_INGREDIENTS_SUCCESS,
          ingredients: responseData.data,
        });
      })
      .catch((error) => {
        dispatch({
          type: GET_INGREDIENTS_FAILED,
          payload: error.message,
        });
      });
  };
}

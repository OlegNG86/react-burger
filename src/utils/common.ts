import { setUserData, setReadyState } from "../services/actions/authorization";
import { AppDispatch } from "../services/reducers";
import { fetchWithRefresh } from "./connector";
import { getTokens } from "./persistant-token";

export interface IFetchUserData {
  (): (dispatch: AppDispatch) => Promise<void>;
}


export const convertErrorResponseToString = (err: unknown) =>
  err instanceof Object && "message" in err && typeof err.message === "string"
    ? err.message
    : err?.toString() || "unknown message";

export const fetchUserData: IFetchUserData = () => async (dispatch) => {
  try {
    const accessToken = getTokens().accessToken;
    if (accessToken) {
      const response = await fetchWithRefresh("auth/user", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          authorization: accessToken,
        },
      });
      dispatch(setUserData(response.user));
    }
  } catch (err) {
    console.error(err);
  } finally {
    dispatch(setReadyState());
  }
};
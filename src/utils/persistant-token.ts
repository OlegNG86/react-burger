const LOCAL_STORAGE_KEY = "userTokens";
const initialValues = {
  accessToken: null,
  refreshToken: null,
};
export const getTokens = () => {
  const _fromStore = localStorage.getItem(LOCAL_STORAGE_KEY);
  if (!_fromStore) return initialValues;
  return JSON.parse(_fromStore);
};
export const clearTokens = () => {
  localStorage.removeItem(LOCAL_STORAGE_KEY);
};
export const setTokens = ({ accessToken, refreshToken }: {accessToken: string, refreshToken: string }) => {
  localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify({ accessToken, refreshToken }));
};
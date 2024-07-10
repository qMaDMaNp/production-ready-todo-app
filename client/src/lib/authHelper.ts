export const getUserStorageData = () => {
  return JSON.parse(localStorage.getItem('user') || null);
};

export const setUserStorageData = (userData) => {
  localStorage.setItem('user', userData);
};

export const removeUserStorageData = () => {
  localStorage.removeItem('user');
};

export const logoutUser = () => {
  removeUserStorageData();
  window.location.reload();
};

export default {
  getUserStorageData,
  setUserStorageData,
  removeUserStorageData,
  logoutUser
}
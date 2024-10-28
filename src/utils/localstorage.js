export const setToken = (token) => {
  localStorage.setItem("token", token);
};

export const removeToken = (tokenName) => {
  localStorage.removeItem(tokenName);
};

import { apiCall } from "./api";

export const login = (data) => {
  return apiCall("POST", "/login", data);
};

export const getAllQuotes = (data, params) => {
  return apiCall("GET", "/getQuotes", data, params);
};

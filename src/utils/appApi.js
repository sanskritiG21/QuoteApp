import { apiCall } from "./api";

export const login = (data) => {
  return apiCall("POST", "/login", data);
};

export const getAllQuotes = (data, params) => {
  return apiCall("GET", "/getQuotes?limit=20&offset=0", data, params);
};

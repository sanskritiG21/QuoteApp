import { apiCall } from "./api";

export const login = (data) => {
  return apiCall("POST", "/login", data);
};

export const getAllQuotes = (data, params) => {
  return apiCall("GET", "/getQuotes", data, params);
};

export const uploadImage = (data, params = null) => {
  return apiCall(
    "POST",
    "/crafto/v1.0/media/assignment/upload",
    data,
    params,
    "https://crafto.app"
  );
};

export const createNewQuote = (data, params = null) => {
  return apiCall("POST", "/postQuote", data, params);
};

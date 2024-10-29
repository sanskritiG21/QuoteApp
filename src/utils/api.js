import axios from "axios";

const defaultBaseURL = "https://assignment.stage.crafto.app";

const axiosInstance = axios.create({
  baseURL: defaultBaseURL,
  timeout: 10000,
});

const getToken = () => {
  return localStorage.getItem("token");
};

// Add Authorization header with token
axiosInstance.interceptors.request.use(
  (config) => {
    const token = getToken();
    if (token) {
      config.headers.Authorization = `${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// interceptor to handle success and error globally
axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response && error.response.status === 401) {
      const requestUrl = error.config.url;

      // Check if the URL is NOT the login endpoint
      if (!requestUrl.includes("/login")) {
        localStorage.removeItem("token");
        window.location.href = "/login";
      }
    }
    return Promise.reject(error);
  }
);

export const apiCall = async (
  method,
  url,
  data = null,
  params = null,
  baseURL = defaultBaseURL
) => {
  const headers =
    data instanceof FormData ? { "Content-Type": "multipart/form-data" } : {};

  try {
    const response = await axiosInstance({
      method,
      url,
      data,
      params,
      baseURL,
      headers,
    });
    return { success: true, data: response.data };
  } catch (error) {
    return {
      success: false,
      error: error.response ? error.response.data : error.message,
    };
  }
};

export default axiosInstance;

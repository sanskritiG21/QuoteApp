import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "https://assignment.stage.crafto.app",
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
      config.headers.Authorization = `Bearer ${token}`;
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
      localStorage.removeItem("token");
      window.location.href = "/login";
    }
    return Promise.reject(error);
  }
);

export const apiCall = async (method, url, data = null) => {
  try {
    const response = await axiosInstance({ method, url, data });
    return { success: true, data: response.data };
  } catch (error) {
    return {
      success: false,
      error: error.response ? error.response.data : error.message,
    };
  }
};

export default axiosInstance;

import axios from 'axios';

const BASE_URL = process.env.REACT_APP_API_ENDPOINT;

const noneTokenClient = axios.create({ baseURL: BASE_URL });
const tokenClient = axios.create({ baseURL: BASE_URL });

tokenClient.interceptors.request.use((config) => {
  config.headers = {
    Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
  };

  return config;
});

noneTokenClient.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    const errorResponse = {
      ...error.response.data,
      status: error.response.status,
    };
    return Promise.reject(errorResponse);
  }
);

tokenClient.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    if (error.response?.status === 401) {
      // TODO: 리프레시 토큰을 활용한 재인증 요청 api를 사용
    }
    const errorResponse = {
      ...error.response.data,
      status: error.response.status,
    };
    return Promise.reject(errorResponse);
  }
);

export { noneTokenClient };

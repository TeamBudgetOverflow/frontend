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

export const userAPI = {
  getUserProfile: async (userId: number) => {
    const { data } = await tokenClient.get(`/users/${userId}`);
    // const data = {
    //   img: '',
    //   nickname: '유진',
    //   description: '안녕하세요',
    // };
    return data;
  },
  getUserGoals: async (userId: number) => {
    const { data } = await tokenClient.get(`/users/${userId}/goals`);
    // const data = {
    //   goals: [
    //     {
    //       id: 1,
    //       title: '생일선물',
    //       description: '친구 생일선물 구매비용 모으기',
    //       isPrivate: false,
    //       hashtag: ['생일선물', '소액모으기'],
    //       amount: 100000,
    //       attainment: 80,
    //       startDate: new Date(),
    //       endDate: new Date('2023-01-20'),
    //       headCount: 1,
    //     },
    //   ],
    // };
    return data;
  },
};

export { noneTokenClient, tokenClient };

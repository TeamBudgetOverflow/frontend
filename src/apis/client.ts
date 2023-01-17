import axios from 'axios';
import { IAccountInfo, IPostAuthAccnt } from '../interfaces/interfaces';

const BASE_URL = process.env.REACT_APP_API_ENDPOINT;
const BANK_BASE_URL = process.env.REACT_APP_BANK_API_ENDPOINT;

const noneTokenClient = axios.create({ baseURL: BASE_URL });
const tokenClient = axios.create({ baseURL: BASE_URL });
const bankClient = axios.create({ baseURL: BANK_BASE_URL });
bankClient.defaults.headers.common['Content-Type'] = 'application/json';
bankClient.defaults.headers.common['user-id'] = process.env.REACT_APP_BANK_API_USER_ID;
bankClient.defaults.headers.common['Hkey'] = process.env.REACT_APP_BANK_API_HKEY;

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
    //       emoji: '26f0-fe0f',
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
    //     {
    //       id: 2,
    //       emoji: '26f0-fe0f',
    //       title: 'test2',
    //       description: 'test입니다2',
    //       isPrivate: false,
    //       hashtag: ['생일선물', '소액모으기'],
    //       amount: 150000,
    //       attainment: 80,
    //       startDate: new Date(),
    //       endDate: new Date('2023-02-15'),
    //       headCount: 3,
    //     },
    //     {
    //       id: 3,
    //       emoji: '26f0-fe0f',
    //       title: 'test3',
    //       description: 'test입니다3',
    //       isPrivate: false,
    //       hashtag: ['생일선물', '랄라'],
    //       amount: 150000,
    //       attainment: 80,
    //       startDate: new Date(),
    //       endDate: new Date('2023-03-10'),
    //       headCount: 3,
    //     },
    //     {
    //       id: 4,
    //       emoji: '26f0-fe0f',
    //       title: 'test4',
    //       description: 'test입니다4',
    //       isPrivate: false,
    //       hashtag: ['생일선물', '랄라'],
    //       amount: 50000,
    //       attainment: 20,
    //       startDate: new Date(),
    //       endDate: new Date('2023-04-10'),
    //       headCount: 3,
    //     },
    //   ],
    // };
    return data;
  },
  getUserBadges: async (userId: number) => {
    const { data } = await tokenClient.get(`/users/${userId}/badges`);
    // const data = [
    //   {
    //     title: '첫 목표 생성',
    //     description: '처음 목표를 추가하면 획득할 수 있는 뱃지입니다.',
    //     isObtained: true,
    //   },
    //   {
    //     title: '첫 목표 달성',
    //     description:
    //       '마감 기한까지 목표 금액을 100% 달성하면 획득할 수 있는 뱃지입니다.',
    //     isObtained: true,
    //   },
    //   {
    //     title: '첫 그룹 참여',
    //     description: '처음 그룹 목표에 참여하면 획득할 수 있는 뱃지입니다.',
    //     isObtained: true,
    //   },
    //   {
    //     title: '첫 그룹 모집',
    //     description: '처음 그룹 목표를 모집하면 획득할 수 있는 뱃지입니다.',
    //     isObtained: true,
    //   },
    //   {
    //     title: '첫 그룹 목표 100% 달성',
    //     description:
    //       '그룹 목표에서 마감 기한까지 목표 금액을 100% 달성하면 획득할 수 있는 뱃지입니다.',
    //     isObtained: true,
    //   },
    //   {
    //     title: '3회 연속 도달',
    //     description:
    //       '목표 금액 100% 달성을 3번 연속하면 획득할 수 있는 뱃지입니다.',
    //     isObtained: true,
    //   },
    // ];
    return data;
  },
};

export const goalApi = {
  getGoalDetail: async (goalId: number) => {
    // const { data } = await tokenClient.get(`goals/${goalId}`);

    const data = {
      goalDetail: {
        createdUserId: 2,
        id: 1,
        title: '생일선물',
        description: '친구 생일선물 구매비용 모으기',
        isPrivate: false,
        hashtag: ['생일선물', '소액모으기'],
        amount: 100000,
        attainment: 80,
        startDate: new Date(),
        endDate: new Date('2023-01-20'),
        recruitCount: 10,
        headCount: 1,
        recruitMembers: [
          { userId: 1, nickname: '태근', img: 'img.jpg' },
          { userId: 2, nickname: '유진', img: 'img2.jpg' },
          { userId: 3, nickname: '제승', img: 'img3.jpg' },
          { userId: 4, nickname: '수완', img: 'img4.jpg' },
          { userId: 5, nickname: '쥬향', img: 'img5.jpg' },
        ],
      },
    };

    return data;
  },

  getGoalsByWord: async (query: string) => {
    const { data } = await tokenClient.get(`/goals/getgoals/search` + query);

    // const data = {
    //   goals: [
    //     {
    //       id: 1,
    //       emoji: '26f0-fe0f',
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
    //     {
    //       id: 2,
    //       emoji: '26f0-fe0f',
    //       title: 'test2',
    //       description: 'test입니다2',
    //       isPrivate: false,
    //       hashtag: ['생일선물', '소액모으기'],
    //       amount: 150000,
    //       attainment: 80,
    //       startDate: new Date(),
    //       endDate: new Date('2023-02-15'),
    //       headCount: 3,
    //     },
    //     {
    //       id: 3,
    //       emoji: '26f0-fe0f',
    //       title: 'test3',
    //       description: 'test입니다3',
    //       isPrivate: false,
    //       hashtag: ['생일선물', '랄라'],
    //       amount: 150000,
    //       attainment: 80,
    //       startDate: new Date(),
    //       endDate: new Date('2023-03-10'),
    //       headCount: 3,
    //     },
    //     {
    //       id: 4,
    //       emoji: '26f0-fe0f',
    //       title: 'test4',
    //       description: 'test입니다4',
    //       isPrivate: false,
    //       hashtag: ['생일선물', '랄라'],
    //       amount: 50000,
    //       attainment: 20,
    //       startDate: new Date(),
    //       endDate: new Date('2023-04-10'),
    //       headCount: 3,
    //     },
    //   ],
    // };

    return data;
  },

  joinGoal: async (goalId: string | undefined) => {
    const response = await tokenClient.post(`api/goals/${goalId}`);

    return response;
  },

  withdrawGoal: async (goalId: string | undefined) => {
    const response = await tokenClient.post(`api/goals/${goalId}`);

    return response;
  },

  deleteGoal: async (goalId: string | undefined) => {
    const response = await tokenClient.post(`api/goals/${goalId}`);

    return response;
  },
};

export const bankAPI = {
  reqAuthAccnt: async (accntInfo: IAccountInfo) => {
    const result = await bankClient.post('/hb0081000378', {
      inBankCode: accntInfo.bankId,
      inAccount: accntInfo.accntNo,
    });

    return result;
  },
  authAccnt: async ({ oriSeqNo, authString }: IPostAuthAccnt) => {
    const result = await bankClient.post('/hb0081000379', {
      oriSeqNo: oriSeqNo,
      inPrintContent: authString,
    });
    return result;
  },
};

export { noneTokenClient, tokenClient };

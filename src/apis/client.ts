import axios from 'axios';

import {
  IAuthAccount,
  IAccount,
  IPostAccount,
  IPostGoal,
  IValidateAccount,
  IReqAuthAccout,
} from '../interfaces/interfaces';

const BASE_URL = process.env.REACT_APP_API_ENDPOINT;
const BANK_BASE_URL = process.env.REACT_APP_BANK_API_ENDPOINT;

const noneTokenClient = axios.create({
  baseURL: BASE_URL,
  responseType: 'json',
  headers: {
    'Content-Type': 'application/json',
  },
});
const tokenClient = axios.create({ baseURL: BASE_URL });
const bankClient = axios.create({ baseURL: BANK_BASE_URL });
bankClient.defaults.headers.common['Content-Type'] = 'application/json';
bankClient.defaults.headers.common['user-id'] = process.env.REACT_APP_BANK_API_USER_ID;
bankClient.defaults.headers.common['Hkey'] = process.env.REACT_APP_BANK_API_HKEY;

tokenClient.interceptors.request.use((config) => {
  config.headers = {
    Authorization: `${localStorage.getItem('accessToken')}`,
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
  getKakaoSignup: async (code: string | null) => {
    const { data } = await noneTokenClient.get('/users/auth/kakao?code=' + code);

    return data;
  },

  getNaverSignup: async (code: string | null) => {
    const { data } = await noneTokenClient.get(`/users/auth/naver?code=${code}`);

    localStorage.setItem('accessToken', data.accessToken);
    localStorage.setItem('refreshToken', data.refreshToken);
    return data;
  },

  getGoogleSignup: async (code: string | null) => {
    const { data } = await noneTokenClient.get('/users/auth/google?code=' + code);

    return data;
  },

  postPinCode: async (userId: number, pinCode: object) => {
    const { data } = await tokenClient.post(`/users/${userId}/pincode`, pinCode);

    return data;
  },

  // TODO: 리프레신 토큰 전달
  postAccessTokenByPinCode: async (pinCode: object) => {
    const { data } = await tokenClient.post('/users/pinCode', pinCode);

    return data;
  },

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

export const accountApi = {
  getAccounts: async (userId: number): Promise<Array<IAccount>> => {
    // const { data } = await tokenClient.get(`/accounts/${userId}`);
    // const data = [
    //   {
    //     id: 1,
    //     bankId: 0,
    //     accntNo: '11011102012',
    //   },
    // ];

    const data: Array<IAccount> = [];

    return data;
  },
  createManualAccount: async (userId: number) => {
    const { data } = await tokenClient.post(`/accounts/${userId}/manual`);

    return data;
  },
  createAutoAccount: async (userId: number, accntInfo: IPostAccount) => {
    const { data } = await tokenClient.post(`/accounts/${userId}`, accntInfo);

    return data;
  },
};

export const goalApi = {
  getBanks: async () => {
    // const { data } = await tokenClient.get(`/banks`);
    // TODO: test get banks
    const data = {
      banks: [
        { id: 0, code: '088', name: '신한은행' },
        { id: 1, code: '088', name: '신한은행' },
        { id: 2, code: '088', name: '신한은행' },
        { id: 3, code: '088', name: '신한은행' },
        { id: 4, code: '088', name: '신한은행' },
        { id: 5, code: '088', name: '신한은행' },
        { id: 6, code: '088', name: '신한은행' },
        { id: 7, code: '088', name: '신한은행' },
        { id: 8, code: '088', name: '신한은행' },
        { id: 9, code: '088', name: '신한은행' },
        { id: 10, code: '088', name: '신한은행' },
        { id: 11, code: '088', name: '신한은행' },
        { id: 12, code: '088', name: '신한은행' },
        { id: 13, code: '088', name: '신한은행' },
        { id: 14, code: '088', name: '신한은행' },
        { id: 15, code: '088', name: '신한은행' },
        { id: 16, code: '088', name: '신한은행' },
        { id: 17, code: '088', name: '신한은행' },
        { id: 18, code: '088', name: '신한은행' },
        { id: 19, code: '088', name: '신한은행' },
        { id: 20, code: '088', name: '신한은행' },
      ],
    };
    return data.banks;
  },
  postGoal: async (goalData: IPostGoal) => {
    const { data } = await tokenClient.post(`/goals`, goalData);

    return data;
  },
  getGoalDetail: async (goalId: number) => {
    const { data } = await tokenClient.get(`goals/${goalId}`);

    // const data = {
    //   goalDetail: {
    //     createdUserId: 2,
    //     id: 1,
    //     title: '생일선물',
    //     emoji: '26f0-fe0f',
    //     description: '친구 생일선물 구매비용 모으기',
    //     isPrivate: false,
    //     hashtag: ['생일선물', '소액모으기'],
    //     amount: 100000,
    //     attainment: 80,
    //     startDate: new Date('2023-01-15'),
    //     endDate: new Date('2023-01-16'),
    //     recruitCount: 5,
    //     headCount: 10,
    //     recruitMember: [
    //       { userId: 1, nickname: '태근', img: 'img.jpg', attainment: 80 },
    //       { userId: 2, nickname: '유진', img: 'img2.jpg', attainment: 80 },
    //       { userId: 3, nickname: '제승', img: 'img3.jpg', attainment: 80 },
    //       { userId: 4, nickname: '수완', img: 'img4.jpg', attainment: 80 },
    //       { userId: 5, nickname: '쥬향', img: 'img5.jpg', attainment: 80 },
    //     ],
    //   },
    // };

    // const data = {
    //   goalDetail: {
    //     createdUserId: 1,
    //     id: 2,
    //     title: '생일선물',
    //     emoji: '26f0-fe0f',
    //     description: '친구 생일선물 구매비용 모으기',
    //     isPrivate: false,
    //     hashtag: ['생일선물', '소액모으기'],
    //     amount: 100000,
    //     attainment: 80,
    //     startDate: new Date('2023-01-15'),
    //     endDate: new Date('2023-01-20'),
    //     recruitCount: 1,
    //     headCount: 1,
    //     recruitMember: [{ userId: 1, nickname: '태근', img: 'img.jpg', attainment: 80 }],
    //   },
    // };

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
    const response = await tokenClient.post(`/goals/join/${goalId}`);

    return response;
  },

  withdrawGoal: async (goalId: string | undefined) => {
    const response = await tokenClient.post(`/goals/exit/${goalId}`);

    return response;
  },

  deleteGoal: async (goalId: string | undefined) => {
    const response = await tokenClient.post(`/goals/${goalId}`);

    return response;
  },
};

export const bankAPI = {
  reqAuthAccnt: async ({ bankCode, accntNo }: IReqAuthAccout) => {
    const result = await bankClient.post('/hb0081000378', {
      inBankCode: bankCode,
      inAccount: accntNo,
    });

    return result;
  },
  authAccnt: async ({ oriSeqNo, authString }: IAuthAccount) => {
    const result = await bankClient.post('/hb0081000379', {
      oriSeqNo: oriSeqNo,
      inPrintContent: authString,
    });
    return result;
  },
  validateAccntInfo: async (accntInfo: IValidateAccount) => {
    const result = await bankClient.post('/in0087000484', {
      gubun: '01',
      bankCd: accntInfo.bankCode,
      loginMethod: 'ID',
      userId: accntInfo.bankUserId,
      userPw: accntInfo.bankUserPw,
      acctNo: accntInfo.accntNo,
      acctPw: accntInfo.accntPw,
      signCert: '',
      signPw: '',
      curCd: '',
      detailYN: 'N',
      vndrCode: 'N',
    });
    return result;
  },
};

export { noneTokenClient, tokenClient };

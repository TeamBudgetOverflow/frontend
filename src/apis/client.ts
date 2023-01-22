import axios from 'axios';

import {
  IAuthAccount,
  IAccount,
  IPostAccount,
  IBank,
  IPostGoal,
  IValidateAccount,
  IReqAuthAccout,
} from '../interfaces/interfaces';

const BASE_URL = process.env.REACT_APP_API_ENDPOINT;
const noneTokenClient = axios.create({
  baseURL: BASE_URL,
  responseType: 'json',
  headers: {
    'Cache-Control': 'no-cache',
    'Content-Type': 'application/json',
  },
});
const tokenClient = axios.create({ baseURL: BASE_URL });
const refreshClient = axios.create({ baseURL: BASE_URL });

tokenClient.interceptors.request.use((config) => {
  config.headers = {
    authorization: `${localStorage.getItem('accessToken')}`,
  };

  return config;
});

refreshClient.interceptors.request.use((config) => {
  config.headers = {
    authorization: `${localStorage.getItem('refreshToken')}`,
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
  (error) => {
    if (error.response?.status === 401 || error.response?.status === 410) {
      localStorage.removeItem('accessToken');
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
  getKakaoSignup: async (code: string) => {
    const { data } = await noneTokenClient.get('/users/auth/kakao?code=' + code);

    return data;
  },

  getNaverSignup: async (code: string) => {
    const { data } = await noneTokenClient.post(`/users/auth/naver?code=${code}`);

    return data;
  },

  getGoogleSignup: async (code: string) => {
    const { data } = await noneTokenClient.get('/users/auth/google?code=' + code);

    return data;
  },

  postPinCode: async (userId: number, pinCode: string) => {
    const { data } = await tokenClient.post(`/users/${userId}/pincode`, { pinCode: pinCode });

    return data;
  },

  postAccessTokenByPinCode: async (pinCode: string) => {
    const { data } = await refreshClient.post('/users/pinCode', { pinCode: pinCode });

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
    const { data } = await tokenClient.get(`/accounts/${userId}`);
    // const data = [
    //   {
    //     id: 1,
    //     bankId: 0,
    //     accntNo: '11011102012',
    //   },
    // ];
    // const data: Array<IAccount> = [];

    return data;
  },
  createManualAccount: async (userId: number): Promise<number> => {
    const { data } = await tokenClient.post(`/accounts/${userId}/manual`);

    return data.accountId;
  },
  createAutoAccount: async (userId: number, accntInfo: IPostAccount) => {
    const { data } = await tokenClient.post(`/accounts/${userId}`, accntInfo);

    return data.accountId;
  },
};

export const goalApi = {
  getBanks: async (): Promise<Array<IBank>> => {
    const { data } = await tokenClient.get(`/banks`);
    // const data = {
    //   banks: [
    //     { bankId: 0, bankCode: '088', bankName: '신한은행' },
    //     { bankId: 1, bankCode: '088', bankName: '신한은행' },
    //     { bankId: 2, bankCode: '088', bankName: '신한은행' },
    //     { bankId: 3, bankCode: '088', bankName: '신한은행' },
    //     { bankId: 4, bankCode: '088', bankName: '신한은행' },
    //     { bankId: 5, bankCode: '088', bankName: '신한은행' },
    //     { bankId: 6, bankCode: '088', bankName: '신한은행' },
    //     { bankId: 7, bankCode: '088', bankName: '신한은행' },
    //     { bankId: 8, bankCode: '088', bankName: '신한은행' },
    //     { bankId: 9, bankCode: '088', bankName: '신한은행' },
    //     { bankId: 10, bankCode: '088', bankName: '신한은행' },
    //     { bankId: 11, bankCode: '088', bankName: '신한은행' },
    //     { bankId: 12, bankCode: '088', bankName: '신한은행' },
    //     { bankId: 13, bankCode: '088', bankName: '신한은행' },
    //     { bankId: 14, bankCode: '088', bankName: '신한은행' },
    //     { bankId: 15, bankCode: '088', bankName: '신한은행' },
    //     { bankId: 16, bankCode: '088', bankName: '신한은행' },
    //     { bankId: 17, bankCode: '088', bankName: '신한은행' },
    //     { bankId: 18, bankCode: '088', bankName: '신한은행' },
    //     { bankId: 19, bankCode: '088', bankName: '신한은행' },
    //     { bankId: 20, bankCode: '088', bankName: '신한은행' },
    //   ],
    // };

    return data;
  },
  postGoal: async (goalData: IPostGoal) => {
    const { data } = await tokenClient.post(`/goals`, goalData);

    return data.goalId;
  },
  getGoals: async () => {
    const { data } = await tokenClient.get(`/goals`);
    // const data = {
    //   result: [
    //     {
    //       userId: 1,
    //       goalId: 1,
    //       nickname: '태근',
    //       amount: 100000,
    //       curCount: 1,
    //       headCount: 10,
    //       startDate: new Date('2023-01-18'),
    //       endDate: new Date('2023-01-20'),
    //       title: '생일선물1',
    //       hashtag: ['생일선물', '소액모으기'],
    //       emoji: '26f0-fe0f',
    //       description: '친구 생일선물 구매비용 모으기',
    //       createdAt: new Date('2023-01-05'),
    //       updatedAt: new Date('2023-01-19'),
    //     },
    //     {
    //       userId: 2,
    //       goalId: 2,
    //       nickname: '나래',
    //       amount: 150000,
    //       curCount: 3,
    //       headCount: 10,
    //       startDate: new Date('2023-01-27'),
    //       endDate: new Date('2023-02-22'),
    //       title: '생일선물2',
    //       hashtag: ['생일선물', '소액모으기'],
    //       emoji: '26f0-fe0f',
    //       description: '친구 생일선물 구매비용 모으기',
    //       createdAt: new Date('2023-01-10'),
    //       updatedAt: new Date('2023-01-24'),
    //     },
    //     {
    //       userId: 3,
    //       goalId: 3,
    //       nickname: '유진',
    //       amount: 200000,
    //       curCount: 10,
    //       headCount: 10,
    //       startDate: new Date('2023-01-24'),
    //       endDate: new Date('2023-01-31'),
    //       title: '생일선물3',
    //       hashtag: ['생일선물', '소액모으기'],
    //       emoji: '26f0-fe0f',
    //       description: '친구 생일선물 구매비용 모으기',
    //       createdAt: new Date('2023-01-20'),
    //       updatedAt: new Date('2023-01-20'),
    //     },
    //     {
    //       userId: 4,
    //       goalId: 4,
    //       nickname: '제승',
    //       amount: 250000,
    //       curCount: 1,
    //       headCount: 10,
    //       startDate: new Date('2023-01-25'),
    //       endDate: new Date('2023-02-01'),
    //       title: '생일선물4',
    //       hashtag: ['생일선물', '소액모으기'],
    //       emoji: '26f0-fe0f',
    //       description: '친구 생일선물 구매비용 모으기',
    //       createdAt: new Date('2023-01-19'),
    //       updatedAt: new Date('2023-01-20'),
    //     },
    //   ],
    // };

    return data.result;
  },
  getGoalDetail: async (goalId: number) => {
    const { data } = await tokenClient.get(`/goals/${goalId}`);
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

    return data.result[0];
  },
  getGoalsByWord: async (query: string) => {
    const { data } = await tokenClient.get(`/goals/getgoals/search` + query);
    // const data = {
    //   result: [
    //     {
    //       userId:1
    //       goalId:1,
    //       nickname: '태근'
    //       amount: 100000,
    //       curCount: 1,
    //       headCount: 10,
    //       startDate: new Date('2023-01-10'),
    //       endDate: new Date('2023-01-20'),
    //       title: '생일선물',
    //       hashtag: ['생일선물', '소액모으기'],
    //       emoji: '26f0-fe0f',
    //       description: '친구 생일선물 구매비용 모으기',
    //       createdAt: new Date('2023-01-05'),
    //       updatedAt: new Date('2023-01-19'),
    //     },
    //     {
    //       userId:2
    //       goalId:2,
    //       nickname: '나래'
    //       amount: 150000,
    //       curCount: 3,
    //       headCount: 10,
    //       startDate: new Date('2023-01-15'),
    //       endDate: new Date('2023-01-22'),
    //       title: '생일선물',
    //       hashtag: ['생일선물', '소액모으기'],
    //       emoji: '26f0-fe0f',
    //       description: '친구 생일선물 구매비용 모으기',
    //       createdAt: new Date('2023-01-10'),
    //       updatedAt: new Date('2023-01-24'),
    //     },
    //     {
    //       userId:3
    //       goalId:3,
    //       nickname: '유진'
    //       amount: 200000,
    //       curCount: 10,
    //       headCount: 10,
    //       startDate: new Date('2023-01-24'),
    //       endDate: new Date('2023-01-31'),
    //       title: '생일선물',
    //       hashtag: ['생일선물', '소액모으기'],
    //       emoji: '26f0-fe0f',
    //       description: '친구 생일선물 구매비용 모으기',
    //       createdAt: new Date('2023-01-20'),
    //       updatedAt: new Date('2023-01-20'),
    //     },
    //     {
    //       userId:4
    //       goalId:4,
    //       nickname: '제승'
    //       amount: 250000,
    //       curCount: 1,
    //       headCount: 10,
    //       startDate: new Date('2023-01-25'),
    //       endDate: new Date('2023-02-01'),
    //       title: '생일선물',
    //       hashtag: ['생일선물', '소액모으기'],
    //       emoji: '26f0-fe0f',
    //       description: '친구 생일선물 구매비용 모으기',
    //       createdAt: new Date('2023-01-19'),
    //       updatedAt: new Date('2023-01-20'),
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
    const response = await tokenClient.delete(`/goals/${goalId}`);

    return response;
  },
};

const BANK_USER_ID = process.env.REACT_APP_BANK_API_USER_ID;
const BANK_HKEY = process.env.REACT_APP_BANK_API_HKEY;

export const bankAPI = {
  reqAuthAccnt: async ({ bankCode, accntNo }: IReqAuthAccout) => {
    const result = await axios.post(
      '/hb0081000378',
      {
        inBankCode: bankCode,
        inAccount: accntNo,
      },
      {
        headers: {
          'user-id': BANK_USER_ID,
          HKey: BANK_HKEY,
        },
      }
    );

    return result;
  },
  authAccnt: async ({ oriSeqNo, authString }: IAuthAccount) => {
    const result = await axios.post(
      '/hb0081000379',
      {
        oriSeqNo: oriSeqNo,
        inPrintContent: authString,
      },
      {
        headers: {
          'user-id': BANK_USER_ID,
          HKey: BANK_HKEY,
        },
      }
    );
    return result;
  },
  validateAccntInfo: async (accntInfo: IValidateAccount) => {
    const result = await axios.post(
      '/in0087000484',
      {
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
      },
      {
        headers: {
          'user-id': BANK_USER_ID,
          HKey: BANK_HKEY,
        },
      }
    );
    return result;
  },
};

export { noneTokenClient, tokenClient };

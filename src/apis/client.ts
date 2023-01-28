import axios from 'axios';

import {
  IGoal,
  IAccount,
  IPostAutoAccount,
  IBank,
  IPostGoal,
  IReqAuthAccount,
  IReqAuthAccountResp,
  IAuthAccount,
  IValidateAccount,
  IValidateAccountResp,
  IUpdateBalance,
  IModifyGoal,
  IBalance,
  IUserProfile,
  IUpdateUserProfile,
  ISearchFilterOrdered,
  ISearchFilterSorted,
  ISearchFilterStatus,
  ISearchGoalResult,
} from '../interfaces/interfaces';

const BASE_URL = process.env.REACT_APP_API_ENDPOINT;
const noneTokenClient = axios.create({ baseURL: BASE_URL });
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
    };

    return Promise.reject(errorResponse);
  }
);

tokenClient.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('accessToken');
    }

    return Promise.reject(error.response.status);
  }
);

export const userAPI = {
  getKakaoSignup: async (code: string) => {
    console.log(code);
    const { data } = await noneTokenClient.post(`/users/auth/kakao?code=${code}`);

    return data;
  },

  getNaverSignup: async (code: string) => {
    const { data } = await noneTokenClient.post(`/users/auth/naver?code=${code}`);

    return data;
  },

  getGoogleSignup: async (code: string) => {
    const { data } = await noneTokenClient.post(`/users/auth/google?code=${code}`);

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

    return data;
  },
  getUserGoals: async (userId: number): Promise<Array<IGoal>> => {
    const { data } = await tokenClient.get(`/users/${userId}/goals`);

    return data.result;
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

  patchEditUserProfile: async ({ userId, userProfile }: IUpdateUserProfile) => {
    const { data } = await tokenClient.patch(`/users/${userId}`, userProfile);

    return data;
  },
};

export const accountApi = {
  getAccounts: async (userId: number): Promise<Array<IAccount>> => {
    const { data } = await tokenClient.get(`/accounts/${userId}`);

    return data.data;
  },
  createManualAccount: async (userId: number): Promise<number> => {
    const { data } = await tokenClient.post(`/accounts/${userId}/manual`);

    return data.accountId;
  },
  createAutoAccount: async ({ userId, acctInfo }: IPostAutoAccount): Promise<number> => {
    const { data } = await tokenClient.post(`/accounts/${userId}`, acctInfo);

    return data.accountId;
  },
  getAccountBalance: async ({ userId, accountId }: IBalance) => {
    const { data } = await tokenClient.get(`/accounts/${accountId}/users/${userId}/balance`);

    return data.balance;
  },
  updateAccountBalance: async ({ balanceId, value }: IUpdateBalance) => {
    const { data } = await tokenClient.put(`/accounts/balance/${balanceId}`, { value });

    return data;
  },
};

export const goalApi = {
  getBanks: async (): Promise<Array<IBank>> => {
    const { data } = await tokenClient.get(`/banks`);

    return data;
  },
  postGoal: async (goalData: IPostGoal) => {
    const { data } = await tokenClient.post(`/goals`, goalData);

    return data.goalId;
  },
  getGoals: async () => {
    const { data } = await tokenClient.get(`/goals`);

    return data.result;
  },
  getGoalDetail: async (goalId: number) => {
    const { data } = await tokenClient.get(`/goals/${goalId}`);

    return data.result[0];
  },
  getGoalsByWord: async (
    keyword: string,
    sorted: ISearchFilterSorted,
    min: number,
    max: number,
    orderd: ISearchFilterOrdered,
    status: ISearchFilterStatus,
    page: number
  ): Promise<ISearchGoalResult> => {
    const { data } = await tokenClient.get(
      `/goals/search?keyword=${keyword}&sortby=${sorted.sorted}&min=${min}&max=${max}&orderby=${orderd.ordered}&status=${status.status}&page=${page}`
    );
    // const data = [
    //   {
    //     userId: 0,
    //     goalId: 0,
    //     nickname: 'test1',
    //     amount: 100000,
    //     curCount: 1,
    //     headCount: 10,
    //     startDate: new Date('2023-01-25'),
    //     endDate: new Date('2023-01-27'),
    //     title: 'testTitle1',
    //     hashTag: ['#test1', '#test2'],
    //     emoji: 'emoji',
    //     description: 'desc',
    //     createdAt: new Date('2023-01-24'),
    //     updatedAt: new Date('2023-01-25'),
    //   },
    //   {
    //     userId: 1,
    //     goalId: 1,
    //     nickname: 'test2',
    //     amount: 30000,
    //     curCount: 1,
    //     headCount: 10,
    //     startDate: new Date('2023-01-26'),
    //     endDate: new Date('2023-01-29'),
    //     title: 'testTitle2',
    //     hashTag: ['#test1', '#test2'],
    //     emoji: 'emoji',
    //     description: 'desc',
    //     createdAt: new Date('2023-01-25'),
    //     updatedAt: new Date('2023-01-26'),
    //   },
    //   {
    //     userId: 2,
    //     goalId: 2,
    //     nickname: 'test3',
    //     amount: 50000,
    //     curCount: 1,
    //     headCount: 5,
    //     startDate: new Date('2023-01-23'),
    //     endDate: new Date('2023-01-30'),
    //     title: 'testTitle3',
    //     hashTag: ['#test1', '#test2'],
    //     emoji: 'emoji',
    //     description: 'desc',
    //     createdAt: new Date('2023-01-25'),
    //     updatedAt: new Date('2023-01-26'),
    //   },
    // ];
    return data;
  },
  joinGoal: async ({ goalId, accountId }: { goalId: number; accountId: number }) => {
    const response = await tokenClient.post(`/goals/join/${goalId}`, { accountId });

    return response;
  },
  withdrawGoal: async (goalId: number) => {
    const response = await tokenClient.delete(`/goals/exit/${goalId}`);

    return response;
  },
  modifyGoal: async ({ goalId, goal }: IModifyGoal) => {
    const response = await tokenClient.put(`/goals/${goalId}`, goal);

    return response;
  },
  deleteGoal: async (goalId: number) => {
    const response = await tokenClient.delete(`/goals/${goalId}`);

    return response;
  },
};

const BANK_USER_ID = process.env.REACT_APP_BANK_API_USER_ID;
const BANK_HKEY = process.env.REACT_APP_BANK_API_HKEY;

export const bankAPI = {
  reqAuthAccnt: async ({ bankCode, accntNo }: IReqAuthAccount): Promise<IReqAuthAccountResp> => {
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

    return result.data as IReqAuthAccountResp;
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
  validateAccntInfo: async (accntInfo: IValidateAccount): Promise<IValidateAccountResp> => {
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

    return result.data as IValidateAccountResp;
  },
};

export { noneTokenClient, tokenClient };

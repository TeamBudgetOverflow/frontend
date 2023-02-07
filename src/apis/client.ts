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
  IUpdateUserProfile,
  ISearchGoalResult,
  IUserBadge,
  ISearchFilter,
  ISearchGoal,
  ISignupResponse,
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
      localStorage.setItem('isRefreshExpire', 'false');
    }

    return Promise.reject(error.response.status);
  }
);

refreshClient.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('refreshToken');
      localStorage.setItem('isRefreshExpire', 'true');
    }

    return Promise.reject(error.response.status);
  }
);

export const userAPI = {
  getKakaoSignup: async (code: string): Promise<ISignupResponse> => {
    const { data } = await noneTokenClient.post(`/users/auth/kakao?code=${code}`);

    return data;
  },
  getNaverSignup: async (code: string): Promise<ISignupResponse> => {
    const { data } = await noneTokenClient.post(`/users/auth/naver?code=${code}`);

    return data;
  },
  getGoogleSignup: async (code: string): Promise<ISignupResponse> => {
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
  getUserBadges: async (userId: number): Promise<Array<IUserBadge>> => {
    const { data } = await tokenClient.get(`/users/badges/${userId}`);

    return data.result;
  },
  patchEditUserProfile: async ({ userId, userProfile }: IUpdateUserProfile) => {
    const { data } = await tokenClient.patch(`/users/${userId}`, userProfile);

    return data;
  },
  deleteUserLogout: async () => {
    const { data } = await tokenClient.delete(`/users`);

    return data;
  },
  deleteUserWithdrawalService: async (userId: number) => {
    const { data } = await tokenClient.delete(`/users/exit/${userId}`);

    return data;
  },
};

export const badgeApi = {
  getBadges: async () => {
    const { data } = await tokenClient.get(`/users/badges`);

    return data.result;
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
  getGoals: async (page: number) => {
    const { data } = await tokenClient.get(`/goals?page=${page}`);

    return data;
  },
  getImpendingGoals: async (): Promise<Array<ISearchGoal>> => {
    const { data } = await tokenClient.get('/goals/imminent');

    return data.result;
  },
  getGoalDetail: async (goalId: number) => {
    const { data } = await tokenClient.get(`/goals/${goalId}`);

    return data.result[0];
  },
  getGoalsByWord: async (queries: ISearchFilter): Promise<ISearchGoalResult> => {
    const { data } = await tokenClient.get(
      `/goals/search?keyword=${queries.keyword}&sortby=${queries.sorted}&min=${queries.min}&max=${queries.max}&orderby=${queries.ordered}&status=${queries.status}&page=${queries.page}`
    );

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

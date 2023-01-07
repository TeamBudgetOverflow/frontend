import { tokenClient, noneTokenClient } from './client';

const USERS_API = '/api/users';

const usersApi = {
  // KAKAO & NAVER 소셜 로그인 코드 전달
  getSocialSignup: (code: string) =>
    noneTokenClient.get('/api/login/kakao?code=' + code),
};

export default usersApi;

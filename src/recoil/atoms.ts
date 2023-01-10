import { atom } from 'recoil';

export const userInfo = atom({
  key: 'userInfo',
  default: {
    id: 0,
    isLogin: false,
  },
});

export const userProfile = atom({
  key: 'userProfile',
  default: {
    img: '',
    nickname: '',
    description: '',
  },
});

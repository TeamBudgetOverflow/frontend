import { useRecoilValue, useSetRecoilState } from 'recoil';

import { userInfo } from '../recoil/userAtoms';

const useLogout = () => {
  const setUserInfo = useSetRecoilState(userInfo);
  const savedUserInfo = useRecoilValue(userInfo);

  const logout = () => {
    localStorage.removeItem('accessToken');
    if (savedUserInfo.isLogin || savedUserInfo.isAccessToken) {
      setUserInfo({
        ...savedUserInfo,
        id: 0,
        isLogin: false,
        isAccessToken: false,
      });
    }
  };

  return logout;
};

export default useLogout;

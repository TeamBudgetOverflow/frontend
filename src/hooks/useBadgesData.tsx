import { useNavigate } from 'react-router-dom';
import { useSetRecoilState } from 'recoil';
import { useQuery } from 'react-query';

import { IBadge } from '../interfaces/interfaces';

import { badgeApi } from '../apis/client';

import { badges } from '../recoil/badgeAtoms';

const useBadgesData = () => {
  const navigate = useNavigate();
  const setBadges = useSetRecoilState(badges);
  useQuery<Array<IBadge>>('userBadges', () => badgeApi.getBadges(), {
    onSuccess: (data) => {
      setBadges(data);
    },
    onError: (e) => {
      if (e === 401) {
        navigate('/', { replace: true });
      }
    },
  });
};

export default useBadgesData;

import { useState } from 'react';
import { useRecoilValue } from 'recoil';
import { useQuery, useMutation } from 'react-query';

import { IBadge, IUserBadge } from '../interfaces/interfaces';

import { userAPI, badgeApi } from '../apis/client';

import { userId } from '../recoil/userAtoms';
import { useNavigate } from 'react-router-dom';

const useUserBadgesData = () => {
  const [badges, setBadges] = useState<Array<IBadge>>([]);

  const { id } = useRecoilValue(userId);
  const navigate = useNavigate();
  const { isLoading, isError } = useQuery<Array<IBadge>>('userBadges', () => badgeApi.getBadges(), {
    onSuccess: (data) => {
      setBadges(data);
      mutate(id);
    },
    onError: (e) => {
      if (e === 401) {
        navigate('/', { replace: true });
      }
    },
  });

  const { mutate } = useMutation<Array<IUserBadge>, unknown, number>('userBadges', userAPI.getUserBadges, {
    onSuccess: (data) => {
      setBadges((prev) => {
        const modified = [...prev];
        modified.map((v) => {
          for (const b of data) {
            if (v.badgeId === b.badgeId) {
              return (v.image = v.image.split('.png')[0] + '_color.png');
            }
          }

          return v;
        });

        return modified;
      });
    },
    onError: (e) => {
      if (e === 401) {
        navigate('/', { replace: true });
      }
    },
  });

  return { isLoading, isError, badges };
};

export default useUserBadgesData;

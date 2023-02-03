import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import { useMutation } from 'react-query';

import { IBadge, IUserBadge } from '../interfaces/interfaces';

import { userAPI } from '../apis/client';

import { badges } from '../recoil/badgeAtoms';

const useUserBadgesData = ({ getUserId }: { getUserId: number }) => {
  const savedBadges = useRecoilValue(badges);
  const [userBadges, setUserBadges] = useState<Array<IBadge>>([]);

  const navigate = useNavigate();
  const { isLoading, isError, mutate } = useMutation<Array<IUserBadge>, unknown, number>(
    'userBadges',
    userAPI.getUserBadges,
    {
      onSuccess: (data) => {
        setUserBadges(() => {
          const modified = [...savedBadges];
          return modified.map((v) => {
            for (const b of data) {
              if (v.badgeId === b.badgeId) {
                v = { ...v, image: v.image.split('.png')[0] + '_color.png' };
              }
            }

            return v;
          });
        });
      },
      onError: (e) => {
        if (e === 401) {
          navigate('/', { replace: true });
        }
      },
    }
  );

  useEffect(() => {
    mutate(getUserId);
  }, []);

  return { isLoading, isError, userBadges };
};

export default useUserBadgesData;

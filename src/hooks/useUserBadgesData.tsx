import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import { useMutation } from 'react-query';

import { IBadge, IUserBadge } from '../interfaces/interfaces';

import { userAPI } from '../apis/client';

import { badges } from '../recoil/badgeAtoms';

const useUserBadgesData = ({ getUserId }: { getUserId: number }) => {
  const savedBadges = useRecoilValue(badges);
  const [userBadges, setUserBadges] = useState<Array<IBadge>>(savedBadges);

  const navigate = useNavigate();
  const { isLoading, isError } = useMutation<Array<IUserBadge>, unknown, number>(
    'userBadges',
    () => userAPI.getUserBadges(getUserId),
    {
      onSuccess: (data) => {
        setUserBadges((prev) => {
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
    }
  );

  return { isLoading, isError, userBadges };
};

export default useUserBadgesData;

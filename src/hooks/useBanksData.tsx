import { useNavigate } from 'react-router-dom';
import { useSetRecoilState } from 'recoil';
import { useQuery } from 'react-query';

import { IBank } from '../interfaces/interfaces';

import { goalApi } from '../apis/client';

import { banksInfo } from '../recoil/accntAtoms';

function useBanksData() {
  const setBanksInfo = useSetRecoilState(banksInfo);
  const navigate = useNavigate();
  useQuery<Array<IBank>>('getBanks', () => goalApi.getBanks(), {
    select: (data) => data.slice(2, -1),
    onSuccess: (data) => {
      setBanksInfo(data);
    },
    onError: (e) => {
      if (e === 401) {
        navigate('/', { replace: true });
      }
    },
  });

  return;
}

export default useBanksData;

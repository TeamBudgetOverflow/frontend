import { useEffect } from 'react';
import { useSetRecoilState } from 'recoil';
import { useQuery } from 'react-query';

import { IBank } from '../interfaces/interfaces';

import { goalApi } from '../apis/client';

import { banksInfo } from '../recoil/accntAtoms';

function useBanksData() {
  const { data: banksData } = useQuery<Array<IBank>>('getBanks', () => goalApi.getBanks());
  const setBanksInfo = useSetRecoilState(banksInfo);
  useEffect(() => {
    if (!banksData) return;
    setBanksInfo(banksData.slice(2, -1));
  }, [banksData]);

  return;
}

export default useBanksData;

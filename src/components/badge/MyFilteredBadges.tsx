import React, { useState, useEffect } from 'react';
import { useRecoilValue } from 'recoil';
import { useQuery } from 'react-query';
import styled from 'styled-components';

import BadgeBox from '../common/elem/BadgeBox';

import { userAPI } from '../../apis/client';

import { userInfo } from '../../recoil/atoms';

import { IBadge } from '../../interfaces/interfaces';

const MyFilteredBadges = () => {
  const { id } = useRecoilValue(userInfo);
  const [badges, setBadges] = useState<Array<IBadge>>([
    { title: '뱃지', description: '' },
  ]);
  const { isLoading, data } = useQuery<Array<IBadge>>('userBadges', () =>
    userAPI.getUserBadges(id)
  );

  useEffect(() => {
    if (!data) return;
    setBadges(data);
  }, [data]);

  return (
    <Wrapper>
      {isLoading || !badges ? (
        <>데이터를 불러오는 중입니다</>
      ) : (
        <Row>
          {badges.map((badge) => (
            <BadgeBox key={badge.title}></BadgeBox>
          ))}
        </Row>
      )}
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  overflow-y: auto;
`;

const Row = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  row-gap: 20px;
  column-gap: 35px;
  flex-wrap: wrap;
`;

export default MyFilteredBadges;

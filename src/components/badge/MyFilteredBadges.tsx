import React, { useState } from 'react';
import styled from 'styled-components';

import BadgeBox from '../common/elem/BadgeBox';
import Alert from '../common/alert/Alert';
import LoadingMsg from '../common/elem/LoadingMsg';
import ErrorMsg from '../common/elem/ErrorMsg';
import ModalBox from '../common/elem/ModalBox';
import CloseIconBtn from '../common/elem/btn/CloseIconBtn';

import { IBadge } from '../../interfaces/interfaces';

import useUserBadgesData from '../../hooks/useUserBadgesData';

const MyFilteredBadges = ({ userId }: { userId: number }) => {
  const { isLoading, isError, userBadges } = useUserBadgesData({ getUserId: userId });
  const [selected, setSelected] = useState<IBadge>({ badgeId: 0, title: '', description: '', image: '' });
  const [showDetail, setShowDetail] = useState<boolean>(false);

  return (
    <Wrapper>
      {isLoading && !userBadges ? (
        <Alert height='100%' showBgColor={true}>
          <LoadingMsg />
        </Alert>
      ) : (
        <>
          {isError || !userBadges ? (
            <Alert height='100%' showBgColor={true}>
              <ErrorMsg />
            </Alert>
          ) : (
            <Row>
              {userBadges.map((badge) => (
                <BadgeBoxWrapper
                  key={badge.title}
                  onClick={() => {
                    setShowDetail(true);
                    setSelected(badge);
                  }}>
                  <BadgeBox imgURL={badge.image} />
                </BadgeBoxWrapper>
              ))}
            </Row>
          )}
        </>
      )}
      <ModalBox show={showDetail}>
        <BtnWrapper>
          <CloseIconBtn color='black' closeHandler={() => setShowDetail(false)} />
        </BtnWrapper>
        <Content>
          <BadgeBox imgURL={selected.image} />
          <Text>
            <Name>{`${selected.badgeId}.${selected.title}`}</Name>
            <Description>{selected.description.replace('.', '\n')}</Description>
          </Text>
        </Content>
      </ModalBox>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  height: 100%;
  overflow-y: auto;
`;

const Row = styled.div`
  display: flex;
  flex-direction: row;
  row-gap: 20px;
  column-gap: calc(10% / 2);
  flex-wrap: wrap;
`;

const BadgeBoxWrapper = styled.div`
  width: 30%;
  height: 100px;
`;

const BtnWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  width: 100%;
`;

const Content = styled.div`
  padding: 20px 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
  width: 100%;
`;

const Text = styled(Content)`
  gap: 8px;
`;

const Name = styled.div`
  font: ${(props) => props.theme.paragraphsP3M};
`;

const Description = styled.div`
  font: ${(props) => props.theme.captionC2};
  line-height: 150%;
  text-align: center;
  white-space: pre-wrap;
`;

export default MyFilteredBadges;

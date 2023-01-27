import React, { useState } from 'react';
import styled from 'styled-components';
import { IMemeberInfo } from '../../../interfaces/interfaces';

import Icon from '../../common/elem/Icon';
import ParticipantList from '../goalDetail/group/ParticipantList';

interface ParticipantSectionProps {
  createdUserId: number;
  curCount: number;
  headCount: number;
  members: Array<IMemeberInfo>;
}

const ParticipantSection = ({ createdUserId, curCount, headCount, members }: ParticipantSectionProps) => {
  const [isToggle, setIsToggle] = useState<boolean>(false);

  return (
    <Wrapper>
      <TopContent>
        <Title>참가자 {`${curCount} / ${headCount}`}</Title>
        <Button onClick={() => setIsToggle(!isToggle)}>
          <IconWrapper isToggle={isToggle}>
            <Icon
              width={12}
              height={8}
              color='black'
              path='M5.28991 0.710469L0.69991 5.30047C0.30991 5.69047 0.30991 6.32047 0.69991 6.71047C1.08991 7.10047 1.71991 7.10047 2.10991 6.71047L5.99991 2.83047L9.87991 6.71047C10.2699 7.10047 10.8999 7.10047 11.2899 6.71047C11.6799 6.32047 11.6799 5.69047 11.2899 5.30047L6.69991 0.710469C6.31991 0.320469 5.67991 0.320469 5.28991 0.710469Z'
            />
          </IconWrapper>
        </Button>
      </TopContent>
      <BottomContent isToggle={isToggle}>
        <ParticipantList createdUserId={createdUserId} members={members} />
      </BottomContent>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  width: 100%;
`;

const TopContent = styled.div`
  padding: 8px 0;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width: 100%;
`;

const Title = styled.div`
  font: ${(props) => props.theme.paragraphsP3M};
`;

const Button = styled.div`
  width: 24px;
  height: 24px;
`;

const IconWrapper = styled.div<{ isToggle: boolean }>`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  transform: ${(props) => (props.isToggle ? '' : 'rotate(180deg)')};
  transition: all 0.5s;
`;

const BottomContent = styled.div<{ isToggle: boolean }>`
  width: 100%;
  height: ${(props) => (props.isToggle ? '100%' : 0)};
  overflow: hidden;
  transition: height 0.5s;
`;

export default ParticipantSection;

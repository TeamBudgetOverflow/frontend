import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import styled from 'styled-components';

import TextButton from '../../common/elem/TextButton';

import { postGoal, postGoalType } from '../../../recoil/goalsAtoms';

const TypeSelect = () => {
  const initialType = useRecoilValue(postGoalType);
  const [isGroup, setIsGroup] = useState<boolean>(initialType.isGroup);
  const setPostGoalType = useSetRecoilState(postGoalType);
  const handleSelect = (isGroup: boolean) => {
    setIsGroup(isGroup);
  };

  useEffect(() => {
    setPostGoalType({ isGroup: isGroup });
  }, [isGroup]);

  const setPostGoal = useSetRecoilState(postGoal);
  useEffect(() => {
    setPostGoal({
      emoji: '26f0-fe0f',
      title: '',
      description: '',
      hashTag: [''],
      amount: 1000,
      startDate: new Date(),
      endDate: new Date(),
      headCount: 1,
      isPrivate: false,
      isManual: false,
      accountId: 0,
    });
  }, []);

  const navigate = useNavigate();
  return (
    <Wrapper>
      <SelectBoxWrapper>
        <SelectBox selected={!isGroup} onClick={() => handleSelect(false)}>
          <Content>
            <Img
              width='120px'
              height='120px'
              src={
                !isGroup
                  ? require('../../../assets/img/goal/personal_color.png')
                  : require('../../../assets/img/goal/personal_gray.png')
              }
            />
            <Text selected={!isGroup}>혼자하기</Text>
          </Content>
        </SelectBox>
        <SelectBox selected={isGroup} onClick={() => handleSelect(true)}>
          <Content>
            <Img
              width='120px'
              height='120px'
              src={
                isGroup
                  ? require('../../../assets/img/goal/group_color.png')
                  : require('../../../assets/img/goal/group_gray.png')
              }
            />
            <Text selected={isGroup}>여럿이서 하기</Text>
          </Content>
        </SelectBox>
      </SelectBoxWrapper>
      <ButtonWrapper>
        <TextButton text='다음' onClickHandler={() => navigate(`/goals/post/data/${isGroup ? 'group' : 'personal'}`)} />
      </ButtonWrapper>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 100%;
`;

const SelectBoxWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 10px;
  width: 100%;
  height: 100%;
`;

const SelectBox = styled.div<{ selected: boolean }>`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: calc(50% - 5px);
  aspect-ratio: 1/1;
  border-radius: 16px;
  border: ${(props) => (props.selected ? `2px solid ${props.theme.primary400}` : `2px solid ${props.theme.gray400}`)};
`;

const Content = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
`;

const Img = styled.img<{ width: string; height: string }>`
  width: ${(props) => props.width};
  height: ${(props) => props.height};
`;

const Text = styled.div<{ selected: boolean }>`
  color: ${(props) => (props.selected ? props.theme.primary400 : props.theme.gray400)};
`;

const ButtonWrapper = styled.div`
  width: 100%;
`;

export default TypeSelect;

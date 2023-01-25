import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

interface toggleSelectProps {
  title: string;
  description: string;
  selectHandler: (isTrue: boolean) => void;
}

const ToggleSelectBox = ({ title, description, selectHandler }: toggleSelectProps) => {
  const [isTrue, setIsTrue] = useState<boolean>(false);
  const handleToggle = () => {
    setIsTrue(!isTrue);
  };

  useEffect(() => {
    selectHandler(isTrue);
  }, [isTrue]);

  return (
    <Wrapper>
      <LeftContent>
        <Title>{title}</Title>
        <Description>{description}</Description>
      </LeftContent>
      <ToggleWrapper>
        <ToggleBar isTrue={isTrue} />
        <ToggleKnob isTrue={isTrue} onClick={handleToggle} />
      </ToggleWrapper>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width: 100%;
`;

const LeftContent = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  gap: 8px;
`;

const Title = styled.div`
  font: ${(props) => props.theme.captionC1};
`;

const Description = styled(Title)`
  color: ${(props) => props.theme.gray600};
`;

const ToggleWrapper = styled.div`
  position: relative;
  display: flex;
  flex-direction: row;
  align-items: center;
  width: 52px;
`;

const ToggleBar = styled.div<{ isTrue: boolean }>`
  width: 100%;
  height: 20px;
  border-radius: 25px;
  background-color: ${(props) => (props.isTrue ? props.theme.primaryMain : props.theme.gray300)};
  transition: background-color 0.3s;
`;

const ToggleKnob = styled.div<{ isTrue: boolean }>`
  position: absolute;
  left: ${(props) => (props.isTrue ? '25px' : '0')};
  width: 27px;
  height: 27px;
  border-radius: 50%;
  background-color: white;
  box-shadow: 0px 3px 8px rgba(0, 0, 0, 0.15), 0px 3px 1px rgba(0, 0, 0, 0.06);
  transition: left 0.3s;
`;

export default ToggleSelectBox;

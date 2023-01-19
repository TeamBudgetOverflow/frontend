import React from 'react';
import styled from 'styled-components';

interface OptionSelectBoxProps {
  placeholder: string;
  value: string;
  onClickHandler: () => void;
}

const OptionSelectBox = ({ placeholder, value, onClickHandler }: OptionSelectBoxProps) => {
  return (
    <Wrapper>
      <Select>
        {value.length === 0 ? placeholder : value}
        <Button onClick={onClickHandler}></Button>
      </Select>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  position: relative;
  display: flex;
  flex-direction: row;
  align-items: center;
  width: 100%;
  height: 100%;
`;

const Select = styled.div`
  position: relative;
  padding: 4px 0;
  width: 100%;
  text-align: left;
  font: ${(props) => props.theme.paragraphsP3R};
  color: ${(props) => props.theme.gray600};
  border-bottom: 1px solid black;
`;

const Button = styled.div`
  position: absolute;
  right: 0;
  top: 0;
  margin-bottom: 4px;
  width: 24px;
  height: 24px;
  border: 1px solid black;
`;

export default OptionSelectBox;

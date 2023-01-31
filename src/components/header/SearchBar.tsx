import React from 'react';
import styled from 'styled-components';

import InputBox from '../common/elem/InputBox';

interface SearchBarProps {
  show: boolean;
  value: string;
  changeHandler: (keyword: string) => void;
  keyPressHandler: (e: React.KeyboardEvent<HTMLDivElement>) => void;
}

const SearchBar = ({ show, value, changeHandler, keyPressHandler }: SearchBarProps) => {
  return (
    <SearchBarLayout show={show}>
      <SearchInputWrapper show={show}>
        <InputBox
          type='text'
          value={value}
          placeholder='검색어를 입력하세요'
          onChangeHandler={(e) => changeHandler(e.currentTarget.value)}
          onKeyPressHandler={keyPressHandler}
          showBorder={false}
        />
      </SearchInputWrapper>
    </SearchBarLayout>
  );
};

const SearchBarLayout = styled.div<{ show: boolean }>`
  width: ${(props) => (props.show ? '100%' : '0')};
  height: 60%;
  transition: width 0.8s;
`;

const SearchInputWrapper = styled.div<{ show: boolean }>`
  padding: ${(props) => (props.show ? '4px 17px' : '0')};
  width: calc(100% - 34px);
  border-radius: 32px;
  background-color: ${(props) => props.theme.primary50};
  transition: padding 0.5s;
`;

export default SearchBar;

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

import InputBox from '../common/elem/InputBox';

interface SearchBarProps {
  show: boolean;
}

const SearchBar = ({ show }: SearchBarProps) => {
  const [searchKeyword, setSearchKeyword] = useState('');
  const navigate = useNavigate();
  const handleSearchButton = (e: string) => {
    navigate('/goals/lookup/search?search=' + searchKeyword);
    setSearchKeyword('');
  };

  const handleOnKeyPress = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.code === 'Enter' && searchKeyword) {
      handleSearchButton(searchKeyword);
    }
  };

  return (
    <SearchBarLayout show={show}>
      <SearchInputWrapper show={show}>
        <InputBox
          type='text'
          placeholder='검색어를 입력하세요'
          onChangeHandler={(e) => setSearchKeyword(e.currentTarget.value)}
          onKeyPressHandler={(e) => handleOnKeyPress(e)}
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
  background-color: ${(props) => props.theme.gray300};
  transition: padding 0.5s;
`;

export default SearchBar;

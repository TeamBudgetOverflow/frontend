import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

import InputBox from '../common/elem/InputBox';

interface SearchBarProps {
  show: boolean;
}

const SearchBar = ({ show }: SearchBarProps) => {
  const [searchKeyword, setSearchKeyword] = useState('');
  const [onFocus, setOnFocus] = useState(false);

  const navigate = useNavigate();
  const handleSearchButton = (searchKeyword: string) => {
    navigate('/goals/lookup/search?search=' + searchKeyword);
    setSearchKeyword('');
  };

  const handleOnKeyPress = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (event.code === 'Enter' && searchKeyword) {
      handleSearchButton(searchKeyword);
    }
  };

  useEffect(() => {
    if (onFocus === true) {
      navigate('goals/lookup/search');
    }
  }, [onFocus]);

  return (
    <SearchBarLayout show={show}>
      <SearchInputWrapper show={show}>
        <InputBox
          type='text'
          placeholder='검색어를 입력하세요'
          onChangeHandler={(event) => setSearchKeyword(event.currentTarget.value)}
          onKeyPressHandler={(event) => handleOnKeyPress(event)}
          onFocusHandler={() => setOnFocus(true)}
          onBlurHandler={() => setOnFocus(false)}
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

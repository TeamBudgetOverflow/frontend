import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

import Icon from '../common/elem/Icon';
import InputBox from '../common/elem/InputBox';

const SearchBar = () => {
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
    <SearchBarLayout>
      <InputBox
        placeholder='검색'
        borderRadius='20px'
        onChangeHandler={(e) => setSearchKeyword(e.currentTarget.value)}
        onKeyPressHandler={(e) => handleOnKeyPress(e)}
      />
      <SearchIconWrapper>
        <Icon>
          <path d='M10 16c-3.31 0-6-2.69-6-6s2.69-6 6-6 6 2.69 6 6-2.69 6-6 6m13.12 2.88-4.26-4.26A9.842 9.842 0 0 0 20 10c0-5.52-4.48-10-10-10S0 4.48 0 10s4.48 10 10 10c1.67 0 3.24-.41 4.62-1.14l4.26 4.26a3 3 0 0 0 4.24 0 3 3 0 0 0 0-4.24'></path>
        </Icon>
      </SearchIconWrapper>
    </SearchBarLayout>
  );
};

const SearchBarLayout = styled.div`
  flex: 1;
  margin: 0 30px;
  height: 60%;
  display: flex;
  flex-direction: row;
  align-items: center;
`;

const SearchIconWrapper = styled.div`
  margin: 0px 5px;
  display: flex;
  flex-direction: row;
  align-items: center;
  :hover {
    cursor: pointer;
  }
`;

export default SearchBar;

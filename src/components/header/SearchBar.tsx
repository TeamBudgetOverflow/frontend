import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import styled from 'styled-components';
import InputBox from '../common/elem/InputBox';
import { Search } from '../common/icons/Search';

const SearchBar = () => {
  const [searchKeyword, setSearchKeyword] = useState('');
  const navigate = useNavigate();
  const handleSearchButton = (e: string) => {
    navigate('/goals/search?search=' + searchKeyword);
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
        <Search onClick={() => handleSearchButton(searchKeyword)} />
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

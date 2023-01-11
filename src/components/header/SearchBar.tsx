import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import styled from 'styled-components';
import InputBox from '../common/elem/InputBox';
import { Search } from '../common/icons/Search';

const SearchBar = () => {
  const [searchKeyword, setSearchKeyword] = useState('');
  const navigate = useNavigate();
  const handleSubmitKeyPress = (e: string) => {
    navigate('/goals?search=' + searchKeyword);
    setSearchKeyword('');
  };

  // TODO: 엔터키에도 작동하도록 만들기
  return (
    <SearchBarLayout>
      <InputBox
        placeholder='검색'
        borderRadius='20px'
        onChangeHandler={(e) => setSearchKeyword(e.currentTarget.value)}
        // onKeyPressHandler={() => handleSubmitKeyPress(searchKeyword)}
      />
      <Search onClick={() => handleSubmitKeyPress(searchKeyword)} />
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
  justify-content: baseline;
`;

export default SearchBar;

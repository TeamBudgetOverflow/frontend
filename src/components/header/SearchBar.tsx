import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSetRecoilState } from 'recoil';
import styled from 'styled-components';
import { searchBarOnFocusEvent } from '../../recoil/searchAtoms';

import InputBox from '../common/elem/InputBox';

const SearchBar = () => {
  const [searchKeyword, setSearchKeyword] = useState('');
  const navigate = useNavigate();
  const handleSearchButton = (e: string) => {
    navigate('/goals/lookup/search?search=' + e);
    setSearchKeyword('');
  };

  const handleOnKeyPress = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.code === 'Enter' && searchKeyword) {
      handleSearchButton(searchKeyword);
    }
  };

  const [onFocus, setOnFocus] = useState(false);

  const setSearchBarOnFocusEvent = useSetRecoilState(searchBarOnFocusEvent);

  useEffect(() => {
    setSearchBarOnFocusEvent(onFocus);
  }, [onFocus]);

  return (
    <SearchBarLayout>
      <InputBox
        type='text'
        placeholder='검색'
        borderRadius='20px'
        onChangeHandler={(e) => setSearchKeyword(e.currentTarget.value)}
        onKeyPressHandler={(e) => handleOnKeyPress(e)}
        onFocusHandler={() => setOnFocus(true)}
        onBlurHandler={() => setOnFocus(false)}
      />
    </SearchBarLayout>
  );
};

const SearchBarLayout = styled.div`
  flex: auto;
  height: 60%;
  display: flex;
  flex-direction: row;
  align-items: center;
`;

export default SearchBar;

import React from 'react';
import styled from 'styled-components';

import useKeywordSearch from '../../hooks/useKeywordSearch';

interface SearchInputProps {
  show: boolean;
  pathname: string;
}

const SearchInput = ({ show, pathname }: SearchInputProps) => {
  const { keyword, handleKeywordChange, handleKeypress } = useKeywordSearch({ pathname });

  return (
    <SearchBarLayout show={show}>
      <SearchInputWrapper show={show}>
        <Input
          type='text'
          value={keyword}
          placeholder='검색어를 입력하세요'
          onChange={(e) => handleKeywordChange(e.currentTarget.value)}
          onKeyPress={handleKeypress}
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

const Input = styled.input`
  padding: 3px 0;
  width: 100%;
  height: 100%;
  border: none;
  font: ${(props) => props.theme.paragraphsP3R};
  color: black;
  background-color: transparent;
  ::placeholder {
    color: ${(props) => props.theme.primary200};
  }
  :focus {
    outline: none;
  }
`;

export default SearchInput;

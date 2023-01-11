import React from 'react';

import styled from 'styled-components';

const SearchBar = () => {
  return <SearchBarLayout>searchbar</SearchBarLayout>;
};

const SearchBarLayout = styled.div`
  flex: 1;
  margin: 0 30px;
  @media screen and (max-width: 318px) {
    display: none;
  }
`;

export default SearchBar;

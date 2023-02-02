import React, { Ref, forwardRef } from 'react';
import { useLocation } from 'react-router';
import styled from 'styled-components';

import Logo from '../components/common/elem/Logo';
import SearchBar from '../components/header/SearchBar';
import Icon from '../components/common/elem/Icon';

import useHeaderState from '../hooks/useHeaderState';
import usePageName from '../hooks/usePageName';

interface HeaderProps {
  props: string;
}

const Header = (props: HeaderProps, ref: Ref<HTMLDivElement>) => {
  const { pathname } = useLocation();
  const { pageName } = usePageName({ pathname });
  const {
    showSearchBtn,
    showChatBtn,
    showPrevBtn,
    showSearchBar,
    keyword,
    showSettingsBtn,
    handlePrevClick,
    handleChatClick,
    handleSearchClick,
    handleKeywordChange,
    handleKeypress,
    handleSettingsClick,
  } = useHeaderState({ pathname });

  return (
    <HeaderLayout ref={ref}>
      {pathname === '/home' ? <Logo type='small' size={52} /> : <></>}
      <Button show={showPrevBtn} onClick={handlePrevClick}>
        <Icon
          width={showPrevBtn ? 32 : 0}
          height={showPrevBtn ? 32 : 0}
          color={'primary400'}
          path={
            'M25.3335 14.6667H10.4401L16.9468 8.16004C17.4668 7.64004 17.4668 6.78671 16.9468 6.26671C16.4268 5.74671 15.5868 5.74671 15.0668 6.26671L6.28014 15.0534C5.76014 15.5734 5.76014 16.4134 6.28014 16.9334L15.0668 25.72C15.5868 26.24 16.4268 26.24 16.9468 25.72C17.4668 25.2 17.4668 24.36 16.9468 23.84L10.4401 17.3334H25.3335C26.0668 17.3334 26.6668 16.7334 26.6668 16C26.6668 15.2667 26.0668 14.6667 25.3335 14.6667Z'
          }
        />
      </Button>
      <SearchBarWrapper>
        <SearchBar
          show={showSearchBar}
          value={keyword}
          changeHandler={handleKeywordChange}
          keyPressHandler={handleKeypress}
        />
      </SearchBarWrapper>
      <PageNameWrapper>
        <PageName show={!showSearchBar}>{pageName}</PageName>
      </PageNameWrapper>
      <RightIcons>
        <Button show={showSearchBtn && !showSearchBar} onClick={handleSearchClick}>
          <Icon
            width={showSearchBtn && !showSearchBar ? 32 : 0}
            height={showSearchBtn && !showSearchBar ? 32 : 0}
            color={'black'}
            path={
              'M20.6667 18.6667H19.6133L19.24 18.3067C20.5467 16.7867 21.3333 14.8133 21.3333 12.6667C21.3333 7.88 17.4533 4 12.6667 4C7.88 4 4 7.88 4 12.6667C4 17.4533 7.88 21.3333 12.6667 21.3333C14.8133 21.3333 16.7867 20.5467 18.3067 19.24L18.6667 19.6133V20.6667L25.3333 27.32L27.32 25.3333L20.6667 18.6667ZM12.6667 18.6667C9.34667 18.6667 6.66667 15.9867 6.66667 12.6667C6.66667 9.34667 9.34667 6.66667 12.6667 6.66667C15.9867 6.66667 18.6667 9.34667 18.6667 12.6667C18.6667 15.9867 15.9867 18.6667 12.6667 18.6667Z'
            }
          />
        </Button>
        <Button show={showChatBtn && !showSearchBar} onClick={handleChatClick}>
          <Icon
            width={showChatBtn && !showSearchBar ? 28 : 0}
            height={showChatBtn && !showSearchBar ? 28 : 0}
            color={'primary400'}
            path={
              'M3.33329 0.666992H24.6666C26.1333 0.666992 27.3333 1.86699 27.3333 3.33366V19.3337C27.3333 20.8003 26.1333 22.0003 24.6666 22.0003H5.99996L0.666626 27.3337V3.33366C0.666626 1.86699 1.86663 0.666992 3.33329 0.666992ZM19.3333 12.667C20.0697 12.667 20.6666 12.07 20.6666 11.3337C20.6666 10.5973 20.0697 10.0003 19.3333 10.0003C18.5969 10.0003 18 10.5973 18 11.3337C18 12.07 18.5969 12.667 19.3333 12.667ZM15.3333 11.3337C15.3333 12.07 14.7363 12.667 14 12.667C13.2636 12.667 12.6666 12.07 12.6666 11.3337C12.6666 10.5973 13.2636 10.0003 14 10.0003C14.7363 10.0003 15.3333 10.5973 15.3333 11.3337ZM8.66663 12.667C9.40301 12.667 9.99996 12.07 9.99996 11.3337C9.99996 10.5973 9.40301 10.0003 8.66663 10.0003C7.93025 10.0003 7.33329 10.5973 7.33329 11.3337C7.33329 12.07 7.93025 12.667 8.66663 12.667Z'
            }
          />
        </Button>
        <Button show={showSettingsBtn && !showSearchBar} onClick={handleSettingsClick}>
          <Icon
            width={showSettingsBtn && !showSearchBar ? 26 : 0}
            height={showSettingsBtn && !showSearchBar ? 28 : 0}
            color={'primary400'}
            path={
              'M22.9067 15.307C22.96 14.8803 23 14.4537 23 14.0003C23 13.547 22.96 13.1203 22.9067 12.6937L25.72 10.4937C25.9734 10.2937 26.04 9.93366 25.88 9.64033L23.2134 5.02699C23.0534 4.73366 22.6934 4.62699 22.4 4.73366L19.08 6.06699C18.3867 5.53366 17.64 5.09366 16.8267 4.76033L16.32 1.22699C16.28 0.906992 16 0.666992 15.6667 0.666992H10.3334C10 0.666992 9.72003 0.906992 9.68003 1.22699L9.17336 4.76033C8.36003 5.09366 7.61336 5.54699 6.92003 6.06699L3.60003 4.73366C3.29336 4.61366 2.9467 4.73366 2.7867 5.02699L0.12003 9.64033C-0.0533034 9.93366 0.0266968 10.2937 0.28003 10.4937L3.09336 12.6937C3.04003 13.1203 3.00003 13.5603 3.00003 14.0003C3.00003 14.4403 3.04003 14.8803 3.09336 15.307L0.28003 17.507C0.0266968 17.707 -0.03997 18.067 0.12003 18.3603L2.7867 22.9737C2.9467 23.267 3.3067 23.3737 3.60003 23.267L6.92003 21.9337C7.61336 22.467 8.36003 22.907 9.17336 23.2403L9.68003 26.7737C9.72003 27.0937 10 27.3337 10.3334 27.3337H15.6667C16 27.3337 16.28 27.0937 16.32 26.7737L16.8267 23.2403C17.64 22.907 18.3867 22.4537 19.08 21.9337L22.4 23.267C22.7067 23.387 23.0534 23.267 23.2134 22.9737L25.88 18.3603C26.04 18.067 25.9734 17.707 25.72 17.507L22.9067 15.307ZM13 18.667C10.4267 18.667 8.33336 16.5737 8.33336 14.0003C8.33336 11.427 10.4267 9.33366 13 9.33366C15.5734 9.33366 17.6667 11.427 17.6667 14.0003C17.6667 16.5737 15.5734 18.667 13 18.667Z'
            }
          />
        </Button>
      </RightIcons>
    </HeaderLayout>
  );
};

const HeaderLayout = styled.div`
  position: relative;
  padding: 8px 22px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width: calc(100% - 44px);
  background-color: white;
  border-bottom: 1px solid ${(props) => props.theme.gray100};
`;

const SearchBarWrapper = styled.div`
  z-index: 1;
  margin-left: 20px;
  width: 100%;
`;

const RightIcons = styled.div`
  z-index: 5;
  display: flex;
  flex-direction: row;
  align-items: center;
`;

const Button = styled.div<{ show: boolean }>`
  padding-left: ${(props) => (props.show ? '8px' : '')};
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  z-index: 5;
  width: ${(props) => (props.show ? '28px' : '0')};
  height: ${(props) => (props.show ? '28px' : '0')};
  transition: width 0.5s;
`;

const PageNameWrapper = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  z-index: 0;
  padding: 8px 22px;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  width: calc(100% - 44px);
  height: calc(100% - 16px);
`;

const PageName = styled.div<{ show: boolean }>`
  display: ${(props) => (props.show ? '' : 'none')};
  font: ${(props) => props.theme.paragraphsP2M};
`;

export default forwardRef(Header);

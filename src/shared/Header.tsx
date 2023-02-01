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
            width={showChatBtn && !showSearchBar ? 32 : 0}
            height={showChatBtn && !showSearchBar ? 32 : 0}
            color={'primary400'}
            path={
              'M5.33317 2.66675H26.6665C28.1332 2.66675 29.3332 3.86675 29.3332 5.33341V21.3334C29.3332 22.8001 28.1332 24.0001 26.6665 24.0001H7.99984L2.6665 29.3334V5.33341C2.6665 3.86675 3.8665 2.66675 5.33317 2.66675ZM21.3332 14.6667C22.0696 14.6667 22.6665 14.0698 22.6665 13.3334C22.6665 12.597 22.0696 12.0001 21.3332 12.0001C20.5968 12.0001 19.9998 12.597 19.9998 13.3334C19.9998 14.0698 20.5968 14.6667 21.3332 14.6667ZM17.3332 13.3334C17.3332 14.0698 16.7362 14.6667 15.9998 14.6667C15.2635 14.6667 14.6665 14.0698 14.6665 13.3334C14.6665 12.597 15.2635 12.0001 15.9998 12.0001C16.7362 12.0001 17.3332 12.597 17.3332 13.3334ZM10.6665 14.6667C11.4029 14.6667 11.9998 14.0698 11.9998 13.3334C11.9998 12.597 11.4029 12.0001 10.6665 12.0001C9.93012 12.0001 9.33317 12.597 9.33317 13.3334C9.33317 14.0698 9.93012 14.6667 10.6665 14.6667Z'
            }
          />
        </Button>
        <Button show={showSettingsBtn && !showSearchBar} onClick={handleSettingsClick}>
          <Icon
            width={showSettingsBtn && !showSearchBar ? 32 : 0}
            height={showSettingsBtn && !showSearchBar ? 32 : 0}
            color={'primary400'}
            path={
              'M17.4298 10.98C17.4698 10.66 17.4998 10.34 17.4998 10C17.4998 9.66 17.4698 9.34 17.4298 9.02L19.5398 7.37C19.7298 7.22 19.7798 6.95 19.6598 6.73L17.6598 3.27C17.5398 3.05 17.2698 2.97 17.0498 3.05L14.5598 4.05C14.0398 3.65 13.4798 3.32 12.8698 3.07L12.4898 0.42C12.4598 0.18 12.2498 0 11.9998 0H7.99984C7.74984 0 7.53984 0.18 7.50984 0.42L7.12984 3.07C6.51984 3.32 5.95984 3.66 5.43984 4.05L2.94984 3.05C2.71984 2.96 2.45984 3.05 2.33984 3.27L0.339839 6.73C0.209839 6.95 0.26984 7.22 0.45984 7.37L2.56984 9.02C2.52984 9.34 2.49984 9.67 2.49984 10C2.49984 10.33 2.52984 10.66 2.56984 10.98L0.45984 12.63C0.26984 12.78 0.219839 13.05 0.339839 13.27L2.33984 16.73C2.45984 16.95 2.72984 17.03 2.94984 16.95L5.43984 15.95C5.95984 16.35 6.51984 16.68 7.12984 16.93L7.50984 19.58C7.53984 19.82 7.74984 20 7.99984 20H11.9998C12.2498 20 12.4598 19.82 12.4898 19.58L12.8698 16.93C13.4798 16.68 14.0398 16.34 14.5598 15.95L17.0498 16.95C17.2798 17.04 17.5398 16.95 17.6598 16.73L19.6598 13.27C19.7798 13.05 19.7298 12.78 19.5398 12.63L17.4298 10.98ZM9.99984 13.5C8.06984 13.5 6.49984 11.93 6.49984 10C6.49984 8.07 8.06984 6.5 9.99984 6.5C11.9298 6.5 13.4998 8.07 13.4998 10C13.4998 11.93 11.9298 13.5 9.99984 13.5Z'
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
  gap: 8px;
`;

const Button = styled.div<{ show: boolean }>`
  z-index: 5;
  width: ${(props) => (props.show ? '32px' : '0')};
  height: ${(props) => (props.show ? '32px' : '0')};
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

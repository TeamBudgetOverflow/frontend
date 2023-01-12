import React, { useState, useEffect, Ref, forwardRef } from 'react';
import { useLocation, useNavigate } from 'react-router';
import styled from 'styled-components';

import Logo from '../components/common/elem/Logo';
import SearchBar from '../components/header/SearchBar';
import Icon from '../components/common/elem/Icon';

interface HeaderProps {
  props: string;
}

enum PageType {
  postGoal,
  selectAccnt,
  createAccnt,
  lookupGoal,
  my,
  editProfile,
  none,
}

const PageKR = (type: PageType) => {
  switch (type) {
    case PageType.postGoal:
      return '목표 추가하기';
    case PageType.selectAccnt:
      return '계좌 선택';
    case PageType.createAccnt:
      return '계좌 연결';
    case PageType.lookupGoal:
      return '목표 찾기';
    case PageType.my:
      return '마이페이지';
    case PageType.editProfile:
      return '프로필 편집';
    default:
      return '';
  }
};

const Header = (props: HeaderProps, ref: Ref<HTMLDivElement>) => {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const [showSearchBar, setShowSearchBar] = useState<boolean>(false);
  const handleSearch = () => {
    if (pathname !== '/goals/lookup') {
      return navigate(-1);
    }
    setShowSearchBar(!showSearchBar);
  };

  const [showBeforeBtn, setShowBeforeBtn] = useState<boolean>(false);
  const [showChatIcons, setShowChatIcons] = useState<boolean>(true);
  const [showSearchIcons, setShowSearchIcons] = useState<boolean>(false);
  const [pageType, setPageType] = useState<PageType>(PageType.none);
  useEffect(() => {
    switch (pathname) {
      case '/goals/post/type':
        setPageType(PageType.postGoal);
        break;
      case '/goals/post/data/personal':
        setPageType(PageType.postGoal);
        break;
      case '/goals/post/data/group':
        setPageType(PageType.postGoal);
        break;
      case '/goals/post/account/choose':
        setPageType(PageType.selectAccnt);
        break;
      case '/goals/post/account/post':
        setPageType(PageType.createAccnt);
        break;
      case '/goals/lookup':
        setPageType(PageType.lookupGoal);
        break;
      default:
        setPageType(PageType.none);
    }

    if (pathname !== '/goals/lookup') {
      if (pathname === '/') {
        setShowSearchIcons(false);
        return;
      }
      if (pathname.includes('/goals/post')) {
        setShowBeforeBtn(true);
        setShowChatIcons(false);
        setShowSearchIcons(false);
        return;
      }
      setShowSearchBar(false);
      setShowBeforeBtn(false);
      setShowSearchIcons(true);
      return;
    }
  }, [pathname]);

  useEffect(() => {
    if (showSearchBar) return setShowBeforeBtn(true);
  }, [showSearchBar]);

  const [searchBarIndicator, setSearchBarIndicator] = useState(false);

  return (
    <HeaderLayout ref={ref}>
      {pathname === '/' ? <Logo size='small' /> : <></>}
      <Button show={showBeforeBtn} onClick={handleSearch}>
        <Icon
          size={showBeforeBtn ? 32 : 0}
          color={'primary400'}
          path={
            'M25.3335 14.6667H10.4401L16.9468 8.16004C17.4668 7.64004 17.4668 6.78671 16.9468 6.26671C16.4268 5.74671 15.5868 5.74671 15.0668 6.26671L6.28014 15.0534C5.76014 15.5734 5.76014 16.4134 6.28014 16.9334L15.0668 25.72C15.5868 26.24 16.4268 26.24 16.9468 25.72C17.4668 25.2 17.4668 24.36 16.9468 23.84L10.4401 17.3334H25.3335C26.0668 17.3334 26.6668 16.7334 26.6668 16C26.6668 15.2667 26.0668 14.6667 25.3335 14.6667Z'
          }
        />
      </Button>
      <SearchBarWrapper>
        <SearchBar show={showSearchBar} />
      </SearchBarWrapper>
      <PageNameWrapper>
        <PageName show={!showSearchBar}>{PageKR(pageType)}</PageName>
      </PageNameWrapper>
      <RightIcons>
        <Button show={showSearchIcons && !showSearchBar} onClick={handleSearch}>
          <Icon
            size={showSearchIcons && !showSearchBar ? 32 : 0}
            color={'primary400'}
            path={
              'M20.6667 18.6667H19.6133L19.24 18.3067C20.5467 16.7867 21.3333 14.8133 21.3333 12.6667C21.3333 7.88 17.4533 4 12.6667 4C7.88 4 4 7.88 4 12.6667C4 17.4533 7.88 21.3333 12.6667 21.3333C14.8133 21.3333 16.7867 20.5467 18.3067 19.24L18.6667 19.6133V20.6667L25.3333 27.32L27.32 25.3333L20.6667 18.6667ZM12.6667 18.6667C9.34667 18.6667 6.66667 15.9867 6.66667 12.6667C6.66667 9.34667 9.34667 6.66667 12.6667 6.66667C15.9867 6.66667 18.6667 9.34667 18.6667 12.6667C18.6667 15.9867 15.9867 18.6667 12.6667 18.6667Z'
            }
          />
        </Button>
        <Button show={showChatIcons && !showSearchBar}>
          <Icon
            size={showChatIcons && !showSearchBar ? 32 : 0}
            color={'primary400'}
            path={
              'M5.33317 2.66675H26.6665C28.1332 2.66675 29.3332 3.86675 29.3332 5.33341V21.3334C29.3332 22.8001 28.1332 24.0001 26.6665 24.0001H7.99984L2.6665 29.3334V5.33341C2.6665 3.86675 3.8665 2.66675 5.33317 2.66675ZM21.3332 14.6667C22.0696 14.6667 22.6665 14.0698 22.6665 13.3334C22.6665 12.597 22.0696 12.0001 21.3332 12.0001C20.5968 12.0001 19.9998 12.597 19.9998 13.3334C19.9998 14.0698 20.5968 14.6667 21.3332 14.6667ZM17.3332 13.3334C17.3332 14.0698 16.7362 14.6667 15.9998 14.6667C15.2635 14.6667 14.6665 14.0698 14.6665 13.3334C14.6665 12.597 15.2635 12.0001 15.9998 12.0001C16.7362 12.0001 17.3332 12.597 17.3332 13.3334ZM10.6665 14.6667C11.4029 14.6667 11.9998 14.0698 11.9998 13.3334C11.9998 12.597 11.4029 12.0001 10.6665 12.0001C9.93012 12.0001 9.33317 12.597 9.33317 13.3334C9.33317 14.0698 9.93012 14.6667 10.6665 14.6667Z'
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
`;

const SearchBarWrapper = styled.div`
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
  z-index: 3;
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

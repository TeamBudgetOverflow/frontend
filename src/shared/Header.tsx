import React, { useState, Ref, forwardRef } from 'react';
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
    showSurveyBtn,
    showPrevBtn,
    showSearchBar,
    keyword,
    showSettingsBtn,
    handlePrevClick,
    handleBugReport,
    handleSurvey,
    handleSearchClick,
    handleKeywordChange,
    handleKeypress,
    handleSettingsClick,
  } = useHeaderState({ pathname });

  const [showBugTooltip, setShowBugTooltip] = useState<boolean>(false);
  const [showSurveyTooltip, setShowSurveyTooltip] = useState<boolean>(false);

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
        <Button
          show={showSurveyBtn && !showSearchBar}
          onClick={handleBugReport}
          onMouseOver={() => setShowBugTooltip(true)}
          onMouseLeave={() => setShowBugTooltip(false)}>
          <Icon
            width={showSurveyBtn && !showSearchBar ? 22 : 0}
            height={showSurveyBtn && !showSearchBar ? 24 : 0}
            color={'primary400'}
            path={
              'M20.3333 6.66655H17.9199C17.3199 5.62655 16.4933 4.73321 15.4933 4.05321L16.7333 2.81321C17.2533 2.29321 17.2533 1.45321 16.7333 0.933213C16.2133 0.413213 15.3733 0.413213 14.8533 0.933213L12.8933 2.89321C12.2799 2.74655 11.6533 2.66655 10.9999 2.66655C10.3466 2.66655 9.71992 2.74655 9.11992 2.89321L7.14658 0.933213C6.62659 0.413213 5.78659 0.413213 5.26659 0.933213C4.74659 1.45321 4.74659 2.29321 5.26659 2.81321L6.49325 4.05321C5.50659 4.73321 4.67992 5.62655 4.07992 6.66655H1.66659C0.933252 6.66655 0.333252 7.26655 0.333252 7.99988C0.333252 8.73321 0.933252 9.33321 1.66659 9.33321H3.11992C3.05325 9.77321 2.99992 10.2132 2.99992 10.6665V11.9999H1.66659C0.933252 11.9999 0.333252 12.5999 0.333252 13.3332C0.333252 14.0665 0.933252 14.6665 1.66659 14.6665H2.99992V15.9999C2.99992 16.4532 3.05325 16.8932 3.11992 17.3332H1.66659C0.933252 17.3332 0.333252 17.9332 0.333252 18.6665C0.333252 19.3999 0.933252 19.9999 1.66659 19.9999H4.07992C5.46659 22.3865 8.03992 23.9999 10.9999 23.9999C13.9599 23.9999 16.5333 22.3865 17.9199 19.9999H20.3333C21.0666 19.9999 21.6666 19.3999 21.6666 18.6665C21.6666 17.9332 21.0666 17.3332 20.3333 17.3332H18.8799C18.9466 16.8932 18.9999 16.4532 18.9999 15.9999V14.6665H20.3333C21.0666 14.6665 21.6666 14.0665 21.6666 13.3332C21.6666 12.5999 21.0666 11.9999 20.3333 11.9999H18.9999V10.6665C18.9999 10.2132 18.9466 9.77321 18.8799 9.33321H20.3333C21.0666 9.33321 21.6666 8.73321 21.6666 7.99988C21.6666 7.26655 21.0666 6.66655 20.3333 6.66655ZM12.3333 17.3332H9.66659C8.93325 17.3332 8.33325 16.7332 8.33325 15.9999C8.33325 15.2665 8.93325 14.6665 9.66659 14.6665H12.3333C13.0666 14.6665 13.6666 15.2665 13.6666 15.9999C13.6666 16.7332 13.0666 17.3332 12.3333 17.3332ZM12.3333 11.9999H9.66659C8.93325 11.9999 8.33325 11.3999 8.33325 10.6665C8.33325 9.93321 8.93325 9.33321 9.66659 9.33321H12.3333C13.0666 9.33321 13.6666 9.93321 13.6666 10.6665C13.6666 11.3999 13.0666 11.9999 12.3333 11.9999Z'
            }
          />
        </Button>
        <Tooltip show={showBugTooltip}>오류 제보하러 가기</Tooltip>
        <Button
          show={showSurveyBtn && !showSearchBar}
          onClick={handleSurvey}
          onMouseOver={() => setShowSurveyTooltip(true)}
          onMouseLeave={() => setShowSurveyTooltip(false)}>
          <Icon
            width={showSurveyBtn && !showSearchBar ? 24 : 0}
            height={showSurveyBtn && !showSearchBar ? 27 : 0}
            color={'primary400'}
            path={
              'M21.3333 2.99992H15.76C15.2 1.45325 13.7333 0.333252 12 0.333252C10.2667 0.333252 8.8 1.45325 8.24 2.99992H2.66667C1.2 2.99992 0 4.19992 0 5.66658V24.3333C0 25.7999 1.2 26.9999 2.66667 26.9999H21.3333C22.8 26.9999 24 25.7999 24 24.3333V5.66658C24 4.19992 22.8 2.99992 21.3333 2.99992ZM12 2.99992C12.7333 2.99992 13.3333 3.59992 13.3333 4.33325C13.3333 5.06659 12.7333 5.66658 12 5.66658C11.2667 5.66658 10.6667 5.06659 10.6667 4.33325C10.6667 3.59992 11.2667 2.99992 12 2.99992ZM13.3333 21.6666H6.66667C5.93333 21.6666 5.33333 21.0666 5.33333 20.3333C5.33333 19.5999 5.93333 18.9999 6.66667 18.9999H13.3333C14.0667 18.9999 14.6667 19.5999 14.6667 20.3333C14.6667 21.0666 14.0667 21.6666 13.3333 21.6666ZM17.3333 16.3333H6.66667C5.93333 16.3333 5.33333 15.7333 5.33333 14.9999C5.33333 14.2666 5.93333 13.6666 6.66667 13.6666H17.3333C18.0667 13.6666 18.6667 14.2666 18.6667 14.9999C18.6667 15.7333 18.0667 16.3333 17.3333 16.3333ZM17.3333 10.9999H6.66667C5.93333 10.9999 5.33333 10.3999 5.33333 9.66658C5.33333 8.93325 5.93333 8.33325 6.66667 8.33325H17.3333C18.0667 8.33325 18.6667 8.93325 18.6667 9.66658C18.6667 10.3999 18.0667 10.9999 17.3333 10.9999Z'
            }
          />
        </Button>
        <Tooltip show={showSurveyTooltip}>설문 조사하러 가기</Tooltip>
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
  :hover {
    cursor: pointer;
  }
`;

const Tooltip = styled.div<{ show: boolean }>`
  position: absolute;
  top: 100%;
  padding: 4px;
  display: ${(props) => (props.show ? '' : 'none')};
  font: ${(props) => props.theme.captionC2};
  background-color: white;
  box-shadow: 0 5px 5px rgba(0, 0, 0, 0.1);
  white-space: nowrap;
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

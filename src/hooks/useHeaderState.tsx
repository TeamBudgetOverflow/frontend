import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useRecoilValue } from 'recoil';

import { userId } from '../recoil/userAtoms';

const useHeaderState = ({ pathname }: { pathname: string }) => {
  const navigate = useNavigate();
  const [showSearchBtn, setShowSearchBtn] = useState<boolean>(false);
  const [showSearchBar, setShowSearchBar] = useState<boolean>(false);

  const handleSearchClick = () => {
    if (pathname.includes('/goals/lookup'))
      return navigate(
        {
          pathname: '/goals/lookup/search',
          search: `?keyword=`,
        },
        { replace: true }
      );
    navigate('/goals/lookup');
  };

  const [showSurveyBtn, setShowSurveyBtn] = useState<boolean>(false);
  const handleBugReport = () => {
    window.open('https://forms.gle/ybKtWoMMLToAwZsq8');
  };
  const handleSurvey = () => {
    window.open('https://forms.gle/WmpabDTW4X5g9dsc6');
  };

  const [showPrevBtn, setShowPrevBtn] = useState<boolean>(false);
  const handlePrevClick = () => {
    if (pathname.includes('/goals/lookup/search?keyword=') && pathname.split('keyword=')[1] !== undefined) {
      return navigate({ pathname: '/goals/lookup/search', search: `?keyword=` }, { replace: true });
    }
    if (pathname !== '/goals/lookup') {
      return navigate(-1);
    }

    setShowSearchBar(false);
    setShowSearchBtn(true);
    setShowPrevBtn(false);
  };

  const { id } = useRecoilValue(userId);

  const [showSettingsBtn, setShowSettingsBtn] = useState<boolean>(false);
  const handleSettingsClick = () => {
    navigate(`/users/settings/${id}`);
  };

  const showPrevOnly = () => {
    setShowPrevBtn(true);
    setShowSearchBar(false);
    setShowSearchBtn(false);
    setShowSurveyBtn(false);
    setShowSettingsBtn(false);
  };

  const showSurveyOnly = () => {
    setShowPrevBtn(false);
    setShowSearchBar(false);
    setShowSearchBtn(false);
    setShowSurveyBtn(true);
    setShowSettingsBtn(false);
  };

  const showSettingsOnly = () => {
    setShowPrevBtn(false);
    setShowSearchBar(false);
    setShowSearchBtn(false);
    setShowSurveyBtn(false);
    setShowSettingsBtn(true);
  };

  useEffect(() => {
    if (pathname === '/home') {
      showSurveyOnly();
      return;
    }
    if (pathname === `/users/${id}`) {
      showSettingsOnly();
      return;
    }
    if (pathname.includes('/users') && !pathname.includes('/edit') && !pathname.includes('/settings')) {
      setShowSearchBar(false);
      setShowPrevBtn(true);
      setShowSearchBtn(false);
      setShowSurveyBtn(false);
      setShowSettingsBtn(true);
      return;
    }
    if (pathname.includes('/edit')) {
      showPrevOnly();
      return;
    }
    if (pathname.includes('/settings')) {
      showPrevOnly();
      return;
    }
    if (pathname.includes('/goals/post')) {
      showPrevOnly();
      return;
    }
    if (pathname.includes('/accounts')) {
      showPrevOnly();
      return;
    }
    if (pathname.includes('/goals/') && !pathname.includes('lookup') && !pathname.includes('post')) {
      showPrevOnly();
      return;
    }
    if (pathname.includes('/chats')) {
      showPrevOnly();
      return;
    }
    if (pathname === '/goals/lookup/search') {
      setShowSearchBar(true);
      setShowPrevBtn(true);
      setShowSearchBtn(false);
      setShowSurveyBtn(false);
      setShowSettingsBtn(false);
      return;
    }

    setShowPrevBtn(false);
    setShowSearchBar(false);
    setShowSearchBtn(true);
    setShowSurveyBtn(false);
    setShowSettingsBtn(false);
  }, [pathname]);

  return {
    showSearchBtn,
    showSurveyBtn,
    showPrevBtn,
    showSearchBar,
    showSettingsBtn,
    handleSearchClick,
    handleBugReport,
    handleSurvey,
    handlePrevClick,
    handleSettingsClick,
  };
};

export default useHeaderState;

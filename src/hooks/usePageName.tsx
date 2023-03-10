import { useState, useEffect } from 'react';
import { useRecoilValue } from 'recoil';

import { userId } from '../recoil/userAtoms';

enum PageType {
  postGoal,
  selectAccnt,
  createAccnt,
  lookupGoal,
  my,
  editProfile,
  settings,
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
      return '목표 조회';
    case PageType.my:
      return '마이페이지';
    case PageType.editProfile:
      return '프로필 수정';
    case PageType.settings:
      return '설정';
    default:
      return '';
  }
};

const usePageName = ({ pathname }: { pathname: string }) => {
  const { id } = useRecoilValue(userId);
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
      case '/accounts/choose':
        setPageType(PageType.selectAccnt);
        break;
      case '/accounts/post':
        setPageType(PageType.createAccnt);
        break;
      case '/goals/lookup':
        setPageType(PageType.lookupGoal);
        break;
      default:
        setPageType(PageType.none);
    }
    if (pathname.includes('/edit')) {
      setPageType(PageType.editProfile);
      return;
    }
    if (pathname.includes('/settings')) {
      setPageType(PageType.settings);
      return;
    }
    if (pathname === `/users/${id}`) {
      setPageType(PageType.my);
      return;
    }
  }, [pathname]);

  const [pageName, setPageName] = useState<string>('');
  useEffect(() => {
    setPageName(PageKR(pageType));
  }, [pageType]);

  return { pageName };
};

export default usePageName;

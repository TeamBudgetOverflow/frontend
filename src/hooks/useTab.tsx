import { useState } from 'react';

interface ITab {
  title: string;
  isSelected: boolean;
}

const useTab = () => {
  const [tabs, setTabs] = useState<Array<ITab>>([
    { title: '목표', isSelected: true },
    { title: '뱃지', isSelected: false },
  ]);

  const handleTabClick = (selectedTab: string) => {
    setTabs((prev) => {
      const tabList = [...prev];
      tabList.map((v) => {
        if (v.title === selectedTab) {
          v.isSelected = true;
          return;
        }
        v.isSelected = false;
      });

      return tabList;
    });
  };

  return { tabs, handleTabClick };
};

export default useTab;

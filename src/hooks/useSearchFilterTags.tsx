import { useState } from 'react';

import { SearchFilterType, filters } from '../components/goal/searchFilter/FiltersModal';
import { StatusType, SortType } from '../interfaces/interfaces';

interface FilterTag {
  type: SearchFilterType;
  value: string;
}

interface useSearchFIlterTagsProps {
  statusChangeHandler: (type: StatusType) => void;
  sortChangeHandler: (type: SortType) => void;
  rangeChangeHandler: (min: number, max: number) => void;
}

const useSearchFilterTags = ({
  statusChangeHandler,
  sortChangeHandler,
  rangeChangeHandler,
}: useSearchFIlterTagsProps) => {
  const [filterTags, setFilterTags] = useState<Array<FilterTag>>(
    filters.map((v) => {
      return { type: v, value: '' };
    })
  );

  const handleFilterAdd = (filter: SearchFilterType, value: string) => {
    setFilterTags((prev) => {
      const added = [...prev];
      added.map((v) => {
        if (v.type === filter) {
          return (v.value = value);
        }
      });

      return added;
    });
  };

  const handleFilterRemove = (filter: SearchFilterType) => {
    setFilterTags((prev) => {
      const removed = [...prev];
      removed.map((v) => {
        if (v.type === filter) {
          return (v.value = '');
        }
      });

      return removed;
    });

    if (filter === SearchFilterType.status) {
      statusChangeHandler(StatusType.total);
      return;
    }

    sortChangeHandler(SortType.none);
    rangeChangeHandler(0, 0);
  };

  const handleFiltersReset = () => {
    setFilterTags(
      filters.map((v) => {
        return { type: v, value: '' };
      })
    );
  };

  return { filterTags, handleFilterAdd, handleFilterRemove, handleFiltersReset };
};

export default useSearchFilterTags;

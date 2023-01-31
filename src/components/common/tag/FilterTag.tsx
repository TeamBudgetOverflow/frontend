import React from 'react';
import styled from 'styled-components';

import CloseIconBtn from '../elem/btn/CloseIconBtn';
import Icon from '../elem/Icon';

interface FilterTagProps {
  value: string;
  removeHandler?: (value: string) => void;
}

const FilterTag = React.memo(function FilterTag({ value, removeHandler }: FilterTagProps) {
  return (
    <Tag>
      {value}
      {removeHandler ? (
        <CloseIconBtn color='black' closeHandler={() => removeHandler(value)} />
      ) : (
        <IconWrapper>
          <Icon width={18} height={12} color='black' path='M7 12H11V10H7V12ZM0 0V2H18V0H0ZM3 7H15V5H3V7Z' />
        </IconWrapper>
      )}
    </Tag>
  );
});

const Tag = styled.div`
  padding: 4px 12px;
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 5px;
  flex: 0 0 auto;
  font: ${(props) => props.theme.captionC1};
  border-radius: 8px;
  border: 2px solid ${(props) => props.theme.gray300};
  white-space: nowrap;
`;

const IconWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  width: 24px;
  height: 24px;
`;

export default FilterTag;

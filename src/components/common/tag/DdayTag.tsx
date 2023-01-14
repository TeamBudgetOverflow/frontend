import React from 'react';
import styled from 'styled-components';

const DdayTag = ({ dDay }: { dDay: number }) => {
  return <Tag>{`D-${dDay}`}</Tag>;
};

const Tag = styled.div`
  padding: 4px 12px;
  font: ${(props) => props.theme.captionC3};
  border-radius: 15px;
  background-color: ${(props) => props.theme.primary50};
`;

export default DdayTag;

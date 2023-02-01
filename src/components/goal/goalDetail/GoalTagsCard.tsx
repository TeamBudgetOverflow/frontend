import React from 'react';
import styled from 'styled-components';
import HashTag from '../../common/tag/HashTag';

interface GoalTagsCardProps {
  hashTag: string[];
}

const GoalTagsCard = ({ hashTag }: GoalTagsCardProps) => {
  return (
    <Wrapper>
      <TagList>
        {hashTag.map((tag) => {
          return <HashTag key={tag} tag={tag} />;
        })}
      </TagList>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 20px;
  padding: 10px 20px;
  width: calc(100% - 40px);
  border-radius: 16px;
  background-color: white;
`;

const TagList = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  flex-wrap: wrap;
  width: 100%;
  gap: 10px;
`;

export default GoalTagsCard;

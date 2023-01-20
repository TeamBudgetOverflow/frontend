import React from 'react';

import TextButton from '../../common/elem/TextButton';

const GoalModifyButton = () => {
  const handleModify = () => {
    // TODO : 수정하기 페이지 이동
    console.log('수정 페이지 이동');
  };

  return <TextButton text='수정하기' onClickHandler={handleModify} />;
};

export default GoalModifyButton;

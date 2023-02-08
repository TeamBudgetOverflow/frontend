import React, { useState, useEffect, useRef } from 'react';
import { useRecoilValue } from 'recoil';
import styled from 'styled-components';

import MyGoalCard from '../goal/MyGoalCard';
import UserProfile from '../user/UserProfile';
import AddGoalBtn from '../common/elem/btn/AddGoalBtn';
import Icon from '../common/elem/Icon';

import { userId } from '../../recoil/userAtoms';

import { IGoal } from '../../interfaces/interfaces';

interface HomeGuideProps {
  closeHandler: () => void;
}

const HomeGuide = ({ closeHandler }: HomeGuideProps) => {
  const { id } = useRecoilValue(userId);

  const exampleGoals: Array<IGoal> = [
    {
      userId: id,
      goalId: 1,
      nickname: '',
      amount: 1200000,
      attainment: 30,
      curCount: 1,
      headCount: 1,
      startDate: new Date(),
      endDate: new Date('2023-03-20'),
      status: 'proceeding',
      title: '주인님 캣휠 사드리기',
      hashtag: [''],
      emoji: '1f431',
      description: '',
      createdAt: new Date(),
      updatedAt: new Date(),
      isPrivate: false,
    },
    {
      userId: id,
      goalId: 2,
      nickname: '',
      amount: 800000,
      attainment: 20,
      curCount: 1,
      headCount: 1,
      startDate: new Date(),
      endDate: new Date('2023-03-27'),
      status: 'proceeding',
      title: '빵지순례 여행 자금',
      hashtag: [''],
      emoji: '1f950',
      description: '',
      createdAt: new Date(),
      updatedAt: new Date(),
      isPrivate: false,
    },
    {
      userId: id,
      goalId: 3,
      nickname: '',
      amount: 10000000,
      attainment: 10,
      curCount: 1,
      headCount: 1,
      startDate: new Date(),
      endDate: new Date('2023-12-31'),
      status: 'recruit',
      title: '첫차 마련',
      hashtag: [''],
      emoji: '1f6fb',
      description: '',
      createdAt: new Date(),
      updatedAt: new Date(),
      isPrivate: false,
    },
  ];

  const cardRef = useRef<HTMLDivElement>(null);
  const [cardPosition, setCardPosition] = useState(0);
  useEffect(() => {
    if (!cardRef.current) return;
    setCardPosition(cardRef.current.offsetTop);
  }, [cardRef.current]);

  const contentWrapperRef = useRef<HTMLDivElement>(null);
  const [contentHeight, setContentHeight] = useState(0);
  useEffect(() => {
    if (!contentWrapperRef.current) return;
    setContentHeight(contentWrapperRef.current.clientHeight);
  }, [contentWrapperRef.current?.clientHeight]);
  return (
    <>
      <GuideLayoutWrapper>
        <Header>
          <HeaderGuides>
            <GuideText>
              오류 제보, 설문 조사에 참여해보세요 <br /> 2/9 까지 참여자 이벤트 진행중이에요
            </GuideText>
          </HeaderGuides>
          <HeaderBtn>
            <Icon
              width={22}
              height={24}
              color={'primary400'}
              path={
                'M20.3333 6.66655H17.9199C17.3199 5.62655 16.4933 4.73321 15.4933 4.05321L16.7333 2.81321C17.2533 2.29321 17.2533 1.45321 16.7333 0.933213C16.2133 0.413213 15.3733 0.413213 14.8533 0.933213L12.8933 2.89321C12.2799 2.74655 11.6533 2.66655 10.9999 2.66655C10.3466 2.66655 9.71992 2.74655 9.11992 2.89321L7.14658 0.933213C6.62659 0.413213 5.78659 0.413213 5.26659 0.933213C4.74659 1.45321 4.74659 2.29321 5.26659 2.81321L6.49325 4.05321C5.50659 4.73321 4.67992 5.62655 4.07992 6.66655H1.66659C0.933252 6.66655 0.333252 7.26655 0.333252 7.99988C0.333252 8.73321 0.933252 9.33321 1.66659 9.33321H3.11992C3.05325 9.77321 2.99992 10.2132 2.99992 10.6665V11.9999H1.66659C0.933252 11.9999 0.333252 12.5999 0.333252 13.3332C0.333252 14.0665 0.933252 14.6665 1.66659 14.6665H2.99992V15.9999C2.99992 16.4532 3.05325 16.8932 3.11992 17.3332H1.66659C0.933252 17.3332 0.333252 17.9332 0.333252 18.6665C0.333252 19.3999 0.933252 19.9999 1.66659 19.9999H4.07992C5.46659 22.3865 8.03992 23.9999 10.9999 23.9999C13.9599 23.9999 16.5333 22.3865 17.9199 19.9999H20.3333C21.0666 19.9999 21.6666 19.3999 21.6666 18.6665C21.6666 17.9332 21.0666 17.3332 20.3333 17.3332H18.8799C18.9466 16.8932 18.9999 16.4532 18.9999 15.9999V14.6665H20.3333C21.0666 14.6665 21.6666 14.0665 21.6666 13.3332C21.6666 12.5999 21.0666 11.9999 20.3333 11.9999H18.9999V10.6665C18.9999 10.2132 18.9466 9.77321 18.8799 9.33321H20.3333C21.0666 9.33321 21.6666 8.73321 21.6666 7.99988C21.6666 7.26655 21.0666 6.66655 20.3333 6.66655ZM12.3333 17.3332H9.66659C8.93325 17.3332 8.33325 16.7332 8.33325 15.9999C8.33325 15.2665 8.93325 14.6665 9.66659 14.6665H12.3333C13.0666 14.6665 13.6666 15.2665 13.6666 15.9999C13.6666 16.7332 13.0666 17.3332 12.3333 17.3332ZM12.3333 11.9999H9.66659C8.93325 11.9999 8.33325 11.3999 8.33325 10.6665C8.33325 9.93321 8.93325 9.33321 9.66659 9.33321H12.3333C13.0666 9.33321 13.6666 9.93321 13.6666 10.6665C13.6666 11.3999 13.0666 11.9999 12.3333 11.9999Z'
              }
            />
          </HeaderBtn>
          <HeaderBtn>
            <Icon
              width={24}
              height={27}
              color={'primary400'}
              path={
                'M21.3333 2.99992H15.76C15.2 1.45325 13.7333 0.333252 12 0.333252C10.2667 0.333252 8.8 1.45325 8.24 2.99992H2.66667C1.2 2.99992 0 4.19992 0 5.66658V24.3333C0 25.7999 1.2 26.9999 2.66667 26.9999H21.3333C22.8 26.9999 24 25.7999 24 24.3333V5.66658C24 4.19992 22.8 2.99992 21.3333 2.99992ZM12 2.99992C12.7333 2.99992 13.3333 3.59992 13.3333 4.33325C13.3333 5.06659 12.7333 5.66658 12 5.66658C11.2667 5.66658 10.6667 5.06659 10.6667 4.33325C10.6667 3.59992 11.2667 2.99992 12 2.99992ZM13.3333 21.6666H6.66667C5.93333 21.6666 5.33333 21.0666 5.33333 20.3333C5.33333 19.5999 5.93333 18.9999 6.66667 18.9999H13.3333C14.0667 18.9999 14.6667 19.5999 14.6667 20.3333C14.6667 21.0666 14.0667 21.6666 13.3333 21.6666ZM17.3333 16.3333H6.66667C5.93333 16.3333 5.33333 15.7333 5.33333 14.9999C5.33333 14.2666 5.93333 13.6666 6.66667 13.6666H17.3333C18.0667 13.6666 18.6667 14.2666 18.6667 14.9999C18.6667 15.7333 18.0667 16.3333 17.3333 16.3333ZM17.3333 10.9999H6.66667C5.93333 10.9999 5.33333 10.3999 5.33333 9.66658C5.33333 8.93325 5.93333 8.33325 6.66667 8.33325H17.3333C18.0667 8.33325 18.6667 8.93325 18.6667 9.66658C18.6667 10.3999 18.0667 10.9999 17.3333 10.9999Z'
              }
            />
          </HeaderBtn>
        </Header>
        <GuideWrapper>
          <BtnWrapper>
            <div style={{ opacity: 0 }}>
              <UserProfile />
            </div>
            <CloseButton onClick={closeHandler}>닫기</CloseButton>
          </BtnWrapper>
          <GuideContentWrapper height={contentHeight}>
            <GuideText style={{ position: 'absolute', top: '130px', right: '52px', textAlign: 'right' }}>
              현재 내가 진행중 혹은 진행 예정인 <br />
              목표를 둘러보세요
            </GuideText>
            <img
              style={{ position: 'absolute', top: '80px', right: '22px', width: '18px', height: '204px' }}
              src={require('../../assets/img/guide/scroll.png')}
            />
            <GuideText style={{ position: 'absolute', top: `${cardPosition + 130}px` }}>
              목표의 진행여부, 달성률, 남은 목표기간을 확인해보세요 <br /> 클릭하여 상세 정보도 확인이 가능해요!
            </GuideText>
            <div style={{ position: 'absolute', top: `${cardPosition}px`, width: 'calc(100% - 44px)' }}>
              <MyGoalCard goal={exampleGoals[2]} />
            </div>
            <GuideText style={{ position: 'absolute', bottom: '80px', right: '22px', textAlign: 'right' }}>
              목표 추가하기 버튼으로
              <br />
              목표를 새로 생성해보세요
            </GuideText>
            <Button>
              <IconWrapper>
                <Icon
                  width={20}
                  height={20}
                  color={'white'}
                  path='M18.0001 11.3333H11.3334V18C11.3334 18.7333 10.7334 19.3333 10.0001 19.3333C9.26675 19.3333 8.66675 18.7333 8.66675 18V11.3333H2.00008C1.26675 11.3333 0.666748 10.7333 0.666748 9.99996C0.666748 9.26663 1.26675 8.66663 2.00008 8.66663H8.66675V1.99996C8.66675 1.26663 9.26675 0.666626 10.0001 0.666626C10.7334 0.666626 11.3334 1.26663 11.3334 1.99996V8.66663H18.0001C18.7334 8.66663 19.3334 9.26663 19.3334 9.99996C19.3334 10.7333 18.7334 11.3333 18.0001 11.3333Z'
                />
              </IconWrapper>
            </Button>
          </GuideContentWrapper>
          <Navigation>
            <NavGuides>
              <NavGuide>
                <GuideText>내 정보, 전체 목표, 획득한 뱃지 보기</GuideText>
                <img
                  style={{ position: 'absolute', left: '240px', bottom: 0, width: '43px', height: '17px' }}
                  src={require('../../assets/img/guide/line.png')}
                />
              </NavGuide>
              <div>
                <GuideText>다양한 목표 조회</GuideText>
              </div>
            </NavGuides>
            <Menu show={false} />
            <Menu show={true}>
              <Icon
                width={24}
                height={24}
                color={'gray400'}
                path='M4 13H10C10.55 13 11 12.55 11 12V4C11 3.45 10.55 3 10 3H4C3.45 3 3 3.45 3 4V12C3 12.55 3.45 13 4 13ZM4 21H10C10.55 21 11 20.55 11 20V16C11 15.45 10.55 15 10 15H4C3.45 15 3 15.45 3 16V20C3 20.55 3.45 21 4 21ZM14 21H20C20.55 21 21 20.55 21 20V12C21 11.45 20.55 11 20 11H14C13.45 11 13 11.45 13 12V20C13 20.55 13.45 21 14 21ZM13 4V8C13 8.55 13.45 9 14 9H20C20.55 9 21 8.55 21 8V4C21 3.45 20.55 3 20 3H14C13.45 3 13 3.45 13 4Z'
              />
              <Text>목표 조회</Text>
            </Menu>
            <Menu show={true}>
              <Icon
                width={24}
                height={24}
                color={'gray400'}
                path='M12 12C14.21 12 16 10.21 16 8C16 5.79 14.21 4 12 4C9.79 4 8 5.79 8 8C8 10.21 9.79 12 12 12ZM12 14C9.33 14 4 15.34 4 18V19C4 19.55 4.45 20 5 20H19C19.55 20 20 19.55 20 19V18C20 15.34 14.67 14 12 14Z'
              />
              <Text>마이페이지</Text>
            </Menu>
          </Navigation>
        </GuideWrapper>
      </GuideLayoutWrapper>
      <Wrapper>
        <UserProfile />
        <ContentWrapper ref={contentWrapperRef}>
          {exampleGoals.map((goal) => {
            if (goal.goalId === 3)
              return (
                <div ref={cardRef} key={goal.goalId}>
                  <MyGoalCard goal={goal} />
                </div>
              );
            return <MyGoalCard key={goal.goalId} goal={goal} />;
          })}
        </ContentWrapper>
        <AddGoalBtn />
      </Wrapper>
    </>
  );
};

const GuideLayoutWrapper = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  z-index: 10;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
`;

const Header = styled.div`
  position: relative;
  padding: 5px 18px;
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
`;

const HeaderBtn = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 3px;
  margin-left: 2px;
  width: 28px;
  height: 28px;
  border-radius: 8px;
  background-color: white;
`;

const HeaderGuides = styled.div`
  position: absolute;
  top: 8px;
  left: 18%;
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 20px;
`;

const BtnWrapper = styled.div`
  padding: 0 22px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width: calc(100% - 44px);
`;

const CloseButton = styled.div`
  padding: 4px 12px;
  border-radius: 22px;
  border: 1px solid white;
  font: ${(props) => props.theme.paragraphsP3M};
  color: white;
  background-color: rgba(255, 255, 255, 0.5);
`;

const GuideWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  width: 100%;
  height: 100%;
`;

const GuideContentWrapper = styled.div<{ height: number }>`
  position: relative;
  padding: 10px 22px;
  width: calc(100% - 44px);
  height: ${(props) => `${props.height - 20}px`};
`;

const GuideText = styled.div`
  position: relative;
  line-height: 150%;
  font: ${(props) => props.theme.paragraphsP3M};
  color: white;
`;

const Button = styled.div`
  position: absolute;
  bottom: 8px;
  right: 22px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 60px;
  height: 60px;
  border-radius: 50%;
  background-color: ${(props) => props.theme.primary400};
  box-shadow: 2px 2px 8px rgba(0, 0, 0, 0.3);
  :hover {
    cursor: pointer;
  }
`;

const IconWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  width: 20px;
  height: 20px;
`;

const Navigation = styled.div`
  position: relative;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: flex-start;
  width: 100%;
  height: 74px;
`;

const NavGuides = styled.div`
  position: absolute;
  top: -40%;
  left: 44px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 20px;
  width: calc(100% - 44px);
`;

const NavGuide = styled.div`
  position: relative;
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 10px;
  width: 100%;
`;

const Menu = styled.div<{ show: boolean }>`
  padding: 8px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  width: 85px;
  border-radius: 16px;
  background-color: white;
  opacity: ${(props) => (props.show ? 1 : 0)};
`;

const Text = styled.div`
  font: ${(props) => props.theme.paragraphsP3M};
  color: ${(props) => props.theme.gray400};
`;

const Wrapper = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  gap: 10px;
  height: 100%;
  background-color: ${(props) => props.theme.gray100};
`;

const ContentWrapper = styled(Wrapper)`
  padding: 10px 22px;
  gap: 8px;
`;

export default HomeGuide;

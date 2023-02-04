import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import Logo from '../components/common/elem/Logo';
import LogoSubTitle from '../components/common/elem/LogoSubTitle';
import LogoTitle from '../components/common/elem/LogoTitle';

const DesktopLayout = ({ children }: { children: React.ReactNode }) => {
  const ref = useRef<HTMLDivElement>(null);
  const [logoSize, setLogoSize] = useState<number>(100);
  useEffect(() => {
    if (!ref.current) return;
    if (ref.current.clientWidth >= 700) return setLogoSize(120);
    if (ref.current.clientWidth >= 1000) return setLogoSize(180);
  }, [ref.current?.clientWidth]);

  return (
    <Wrapper ref={ref}>
      <LeftContent>
        <LogoContent>
          <LogoSubTitle width={logoSize * 2} height={logoSize * 2} />
          <MainContent>
            <LogoWrapper>
              <Logo type='large' size={logoSize} />
              <LogoTitle width={logoSize} height={logoSize} />
            </LogoWrapper>
            <IntroText>{`💰2030 재테크 병아리들🐥 모여라!\n💸현명한 소비 습관 만들기\n🌄티끌모아 태산에서 함께해요!`}</IntroText>
            <SubText>티끌모아 태산은 모바일 환경에 최적화 되어있습니다.</SubText>
          </MainContent>
        </LogoContent>
      </LeftContent>
      <ViewContent>{children}</ViewContent>
      <RightContent>
        <CreatorsContent>
          <Label>
            <Logo type='small' size={30} />
            제작자
          </Label>
          <Members>
            <Charge>
              <Field>BE</Field>
              <Member>류제승 김수완 김주향</Member>
            </Charge>
            <Charge>
              <Field>FE</Field>
              <Member>손유진 박태근</Member>
            </Charge>
            <Charge>
              <Field>UI/UX</Field>
              <Member>신지예</Member>
            </Charge>
          </Members>
        </CreatorsContent>
      </RightContent>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  width: 100%;
  height: 100vh;
  @media screen and (min-width: 700px) {
    padding: 0 5%;
    display: flex;
    flex-direction: row;
    align-items: center;
    width: 90%;
    background-color: ${(props) => props.theme.primary50};
  }
`;

const LeftContent = styled.div`
  display: none;
  @media screen and (min-width: 700px) {
    margin-top: 48px;
    padding-right: 5%;
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 45%;
    height: calc(100% - 48px);
    max-height: 852px;
  }
`;

const LogoContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`;

const MainContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 40px;
`;

const LogoWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 12px;
`;

const IntroText = styled.div`
  font: ${(props) => props.theme.headingH3};
  color: ${(props) => props.theme.primary400};
  white-space: pre-wrap;

  @media screen and (max-width: 1200px) {
    font: ${(props) => props.theme.paragraphsP3M};
  }
  @media screen and (max-width: 980px) {
    display: none;
  }
`;

const SubText = styled(IntroText)`
  color: ${(props) => props.theme.primary200};
  @media screen and (max-width: 980px) {
    display: none;
  }
`;

const ViewContent = styled.div`
  width: 100vw;
  height: 100%;
  max-height: 900px;
  @media screen and (min-width: 700px) {
    max-width: 414px;
  }
`;

const RightContent = styled.div`
  display: none;
  @media screen and (min-width: 700px) {
    margin-top: 100px;
    padding-left: 5%;
    display: flex;
    flex-direction: row;
    width: calc(45% - 414px);
    height: calc(100% - 100px);
    max-height: 800px;
  }
`;

const CreatorsContent = styled.div`
  display: flex;
  flex-direction: column;
  white-space: pre-wrap;
  word-break: keep-all;
  gap: 40px;
  width: 100%;
  height: calc(100% - 118px);
  @media screen and (max-width: 1430px) {
    display: none;
  }
`;

const Label = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 10px;
  font: ${(props) => props.theme.headingH3};
  color: ${(props) => props.theme.primary900};
`;

const Members = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 20px;
`;

const Charge = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  width: 100%;
`;

const Field = styled.div`
  width: 40%;
  color: ${(props) => props.theme.primary900};
  @media screen and (min-width: 1550px) {
    font: ${(props) => props.theme.headingH4};
  }
  @media screen and (min-width: 1431px) {
    font: ${(props) => props.theme.paragraphsP3M};
  }
`;

const Member = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 30px;
  width: 60%;
  color: ${(props) => props.theme.primary400};
  @media screen and (min-width: 1550px) {
    font: ${(props) => props.theme.headingH4};
  }
  @media screen and (min-width: 1300px) and (max-width: 1549px) {
    font: ${(props) => props.theme.paragraphsP3R};
  }
`;

export default DesktopLayout;

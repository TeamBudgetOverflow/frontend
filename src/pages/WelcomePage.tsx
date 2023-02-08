import React, { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import Slider from 'react-slick';

import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

import DesktopLayout from '../shared/DesktopLayout';
import RouteChangeTracker from '../shared/RouteChangeTracker';
import WelcomePic from '../components/common/elem/WelcomePic';

const WelcomePage = () => {
  RouteChangeTracker();
  const navigate = useNavigate();
  const name = localStorage.getItem('name');

  useEffect(() => {
    setTimeout(() => {
      localStorage.removeItem('name');
      navigate('/home');
    }, 13000);
  }, []);

  const settings = {
    dots: false,
    arrows: true,
    infinite: false,
    fade: true,
    autoplay: true,
    autoplaySpeed: 2500,
    slidesToshow: 1,
    slidesToScroll: 1,
    focusOnSelect: true,
    // afterChange: () => navigate('/home'),
  };

  return (
    <DesktopLayout>
      <Wrapper>
        <Slider {...settings}>
          <div>
            <WelcomeWrapper>
              <Text>
                {name} 님 <br />
                가입을 환영합니다!
              </Text>
              <WelcomePic />
            </WelcomeWrapper>
          </div>
          <Img src={require('../assets/img/onboarding/onboarding1.png')} />
          <Img src={require('../assets/img/onboarding/onboarding2.png')} />
          <Img src={require('../assets/img/onboarding/onboarding3.png')} />
          <Img src={require('../assets/img/onboarding/onboarding4.png')} />
        </Slider>
      </Wrapper>
    </DesktopLayout>
  );
};

const Wrapper = styled.div`
  width: 100%;
  height: 100%;
`;

const WelcomeWrapper = styled.div`
  padding-top: 200px;
  gap: 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  height: calc(100%-200px);
  overflow: hidden;
`;

const Text = styled.div`
  font: ${(props) => props.theme.headingH2};
  text-align: center;
`;

const Img = styled.img`
  width: 100%;
  height: 100vh;
`;

export default WelcomePage;

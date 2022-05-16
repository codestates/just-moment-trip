import React from 'react';
import styled from 'styled-components';
import Navbar from '../components/common/Navbar';
import Cards from '../components/AboutUs/Cards';
import JMT from '../components/AboutUs/Team/JMT.png';
import JMTL from '../components/AboutUs/Team/JMTL.png';

const Body = styled.div`
  align-items: center;
  background: white;
  display: flex;
  height: 100vh;
  justify-content: center;

  @-webkit-keyframes scroll {
    0% {
      -webkit-transform: translateX(0);
      transform: translateX(0);
    }
    100% {
      -webkit-transform: translateX(calc(-250px * 7));
      transform: translateX(calc(-250px * 7));
    }
  }
  @keyframes scroll {
    0% {
      -webkit-transform: translateX(0);
      transform: translateX(0);
    }
    100% {
      -webkit-transform: translateX(calc(-250px * 7));
      transform: translateX(calc(-250px * 7));
    }
  }
`;

const Intro = styled.div`
  font-size: 50px;
  margin: 100px auto 50px auto;
  width: 100vw;
  height: 5vh;
  text-align: center;
  font-family: ManfuBold;

  > img {
    height: 25vh;
    width: 20vw;
  }
`;
function AboutUs() {
  return (
    <>
      <Navbar />
      <Intro>
        <img src={JMT} />
        개발자들
        <img src={JMTL} />
      </Intro>
      <Body>
        <Cards />
      </Body>
    </>
  );
}

export default AboutUs;

import React from 'react';
import styled from 'styled-components';
import Navbar from '../components/common/Navbar';
import Cards from '../components/AboutUs/Cards';

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
  margin-top: 100px;
  text-align: center;
  font-family: ManfuBold;
`;

function AboutUs() {
  return (
    <>
      <Navbar />
      <Intro>개발자들</Intro>
      <Body>
        <Cards />
      </Body>
    </>
  );
}

export default AboutUs;

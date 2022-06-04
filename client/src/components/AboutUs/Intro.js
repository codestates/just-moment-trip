import React from 'react';
import styled from 'styled-components';
import JMT from './Team/JMT.png';
import JMTL from './Team/JMTL.png';

const Header = styled.div`
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

function Intro() {
  return (
    <Header>
      <img src={JMT} />
      개발자들
      <img src={JMTL} />
    </Header>
  );
}

export default Intro;

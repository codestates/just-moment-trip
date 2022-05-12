import React from 'react';
import { team } from './Team/team';
import InfoCard from './InfoCard';
import styled from 'styled-components';
import JMT from './Team/JMT.png';
import JMTL from './Team/JMTL.png';

const Container = styled.div`
  background: pr;
  box-shadow: 0 10px 20px -5px rgba(0, 0, 0, 0.125);
  height: 70%;
  margin: auto;
  overflow: hidden;
  position: relative;
  width: 80%;
  display: flex;

  ::after {
    background: linear-gradient(
      to right,
      white 0%,
      rgba(255, 255, 255, 0) 100%
    );
    content: '';
    height: 100px;
    position: absolute;
    width: 200px;
    z-index: 2;
  }

  ::after {
    right: 0;
    top: 0;
    -webkit-transform: rotateZ(180deg);
    transform: rotateZ(180deg);
  }

  ::before {
    left: 0;
    top: 0;
  }
`;

function Cards() {
  return (
    <Container>
      {team.map(member => (
        <InfoCard key={member.id} {...member} />
      ))}
    </Container>
  );
}

export default Cards;

import React from 'react';
import { team } from './Team/team';
import InfoCard from './InfoCard';
import styled from 'styled-components';

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
    <Body>
      <Container>
        {team.map(member => (
          <InfoCard key={member.id} {...member} />
        ))}
      </Container>
    </Body>
  );
}

export default Cards;

import React from 'react';
import { front, back } from './Team/team';
import InfoCard from './InfoCard';
import styled from 'styled-components';
import JMT from './Team/JMT.png';
import JMTL from './Team/JMTL.png';

const Container = styled.div`
  display: flex;
  justify-content: space-around;
  width: 100vw;
  height: 50vh;
  margin-top: 100px;
`;
const Desc = styled.div`
  display: flex;
  justify-content: space-around;
  width: 100vw;
  height: 100px;
  margin-top: 100px;
  font-size: 56px;

  > img {
    width: 300;
    height: 300;
  }
`;

function Cards() {
  return (
    <>
      <Desc>
        <img src={JMT} />
        개발자들
        <img src={JMTL} />
      </Desc>
      <Container>
        <div>
          {front.map(member => (
            <InfoCard key={member.id} {...member} />
          ))}
        </div>
        <div>
          {back.map(member => (
            <InfoCard key={member.id} {...member} />
          ))}
        </div>
      </Container>
    </>
  );
}

export default Cards;

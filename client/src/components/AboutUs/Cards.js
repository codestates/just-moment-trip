import React from 'react';
import { front, back } from './Team/team';
import InfoCard from './InfoCard';
import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  justify-content: space-around;
  width: 100vw;
  height: 50vh;
  background-image: url('/Team/JMT.png');
`;

function Cards() {
  return (
    <Container>
      <div>
        {front.map(member => (
          <InfoCard {...member} />
        ))}
      </div>
      <div>
        {back.map(member => (
          <InfoCard {...member} />
        ))}
      </div>
    </Container>
  );
}

export default Cards;

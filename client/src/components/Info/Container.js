import React from 'react';
import styled from 'styled-components';

const Cont = styled.div`
  display: flex;
  height: 100vh;
  flex-direction: ${props => props.direction};
  background: ${props => props.back};
  justify-content: space-around;
  align-items: center;
  font-family: IMHyeminFont;
  font-weight: bold;

  > span {
    background-color: white;
  }

  > .message {
    font-size: 30px;
    text-align: center;
  }

  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

function Container({ direction, back, children }) {
  return (
    <Cont direction={direction} back={back}>
      {children}
    </Cont>
  );
}

export default Container;

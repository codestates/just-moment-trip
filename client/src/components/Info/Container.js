import React from 'react';
import styled from 'styled-components';

const Cont = styled.div`
  display: flex;
  height: 100vh;
  flex-direction: ${props => props.direction};
  background: ${props => props.back};
  justify-content: space-around;
  overflow-y: auto;
  align-items: center;
  font-family: SsurroundFont;

  > .inner {
    height: 100vh;
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

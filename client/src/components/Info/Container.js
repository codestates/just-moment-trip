import React from 'react';
import styled from 'styled-components';

const Cont = styled.div`
  margin: 100px;
  display: flex;
  height: ${props => props.height};
  flex-direction: ${props => props.direction};
  justify-content: space-around;
  align-items: center;
  font-family: SsurroundFont;

  > .message {
    font-size: 30px;
    text-align: center;
  }

  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

function Container({ direction, height, children }) {
  return (
    <Cont direction={direction} height={height}>
      {children}
    </Cont>
  );
}

export default Container;

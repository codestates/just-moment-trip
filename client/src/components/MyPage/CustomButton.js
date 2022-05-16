import React from 'react';
import styled from 'styled-components';

const ModalContainer = styled.div`
  align-items: center;
  justify-content: center;
  height: 15px;
  /* height: 15rem; */
  text-align: center;
  margin: 0px 10px 100px 10px;
`;

const ModalBtn = styled.button`
  background-color: ${props => props.backgroundColor};
  transition: 0.5s;
  text-decoration: none;
  border: none;
  font-family: ${props => props.font};
  font-size: 30px;
  padding: 10px;
  color: black;
  border-radius: 30px;
  cursor: pointer;
  :hover {
    background-color: ${props => {
      return props.backgroundColor.replace('0.3', '1');
    }};
  }
`;

function CustomButton({ handler, name, color, font, backgroundColor }) {
  return (
    <ModalContainer>
      <ModalBtn
        onClick={handler}
        color={color}
        font={font}
        backgroundColor={backgroundColor}
      >
        {name}
      </ModalBtn>
    </ModalContainer>
  );
}

export default CustomButton;

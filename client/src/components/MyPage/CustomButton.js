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
  background-color: white;
  text-decoration: none;
  border: none;
  font-family: ${props => props.font};
  font-size: 30px;
  padding: 10px;
  color: black;
  border-radius: 30px;
  -webkit-transition: background-color 2s ease-out;
  -moz-transition: background-color 2s ease-out;
  -o-transition: background-color 2s ease-out;
  transition: background-color 2s ease-out;
  cursor: grab;
  :hover {
    background-color: ${props => props.color};
  }
`;

function CustomButton({ handler, name, color, font }) {
  return (
    <ModalContainer>
      <ModalBtn onClick={handler} color={color} font={font}>
        {name}
      </ModalBtn>
    </ModalContainer>
  );
}

export default CustomButton;

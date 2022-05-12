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
  font-family: SsurroundFont;
  font-size: 30px;
  padding: 20px;
  color: black;
  border-radius: 30px;
  cursor: grab;
`;

function CustomButton({ handler, name }) {
  return (
    <ModalContainer>
      <ModalBtn onClick={handler}>{name}</ModalBtn>
    </ModalContainer>
  );
}

export default CustomButton;

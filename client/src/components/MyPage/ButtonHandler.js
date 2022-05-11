import React from 'react';
import styled from 'styled-components';
import Modal from '../common/Modal';
import DeleteModal from './DeleteModal';

const ButtonContainer = styled.div`
  display: flex;
  justify-content: space-between;
`;

const ModalBtn = styled.button`
  background-color: cadetblue;
  text-decoration: none;
  border: none;
  padding: 20px;
  color: white;
  border-radius: 30px;
  cursor: grab;
`;

const ModalContainer = styled.div`
  height: 15px;
  /* height: 15rem; */
  text-align: center;
  margin: 120px auto;
`;

function ButtonHandler({ signoutHandler }) {
  return (
    <ButtonContainer>
      <Modal name={<div>회원탈퇴</div>}>
        <DeleteModal />
      </Modal>
      <Modal name={<div>정보수정</div>}>
        <div>Hello</div>
      </Modal>
      <ModalContainer>
        <ModalBtn onClick={signoutHandler}>로그아웃</ModalBtn>
      </ModalContainer>
    </ButtonContainer>
  );
}

export default ButtonHandler;

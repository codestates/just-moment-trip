import React from 'react';
import styled from 'styled-components';
import Modal from '../common/Modal';
import DeleteModal from './DeleteModal';
import UpdateModal from './UpdateModal';

const ButtonContainer = styled.div`
  //전체를 감싸는 컨테이너 용
  display: flex;
  justify-content: space-between;
`;

const ModalContainer = styled.div`
  //로그아웃 버튼을 위한 SC
  height: 15px;
  /* height: 15rem; */
  text-align: center;
  margin: 120px auto;
`;

const ModalBtn = styled.button`
  //로그아웃 버튼을 위한 SC
  background-color: white;
  text-decoration: none;
  border: none;
  font-size: 30px;
  padding: 20px;
  color: black;
  border-radius: 30px;
  cursor: grab;
`;

function ButtonHandler({
  userDeleteHandler,
  userPatchHandler,
  signoutHandler,
}) {
  return (
    <ButtonContainer>
      <Modal name={<div>회원탈퇴</div>}>
        <DeleteModal userDeleteHandler={userDeleteHandler} />
      </Modal>
      <Modal name={<div>정보수정</div>}>
        <UpdateModal userPatchHandler={userPatchHandler} />
      </Modal>
      <ModalContainer>
        <ModalBtn onClick={signoutHandler}>로그아웃</ModalBtn>
      </ModalContainer>
    </ButtonContainer>
  );
}

export default ButtonHandler;

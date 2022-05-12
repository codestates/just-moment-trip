import React from 'react';
import styled from 'styled-components';
import Modal from '../common/Modal';
import DeleteModal from './DeleteModal';
import UpdateModal from './UpdateModal';
import CustomButton from './CustomButton';

const ButtonContainer = styled.div`
  //전체를 감싸는 컨테이너 용
  display: flex;
  justify-content: space-between;
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
      <CustomButton
        handler={signoutHandler}
        name={'로그아웃'}
        color={'yellow'}
      />
    </ButtonContainer>
  );
}

export default ButtonHandler;

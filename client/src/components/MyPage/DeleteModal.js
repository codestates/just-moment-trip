import React from 'react';
import styled from 'styled-components';
import CustomButton from './CustomButton';

const Container = styled.div`
  text-align: center;
  font-size: 50px;
  color: black;

  > .warning {
    color: red;
  }
`;

function DeleteModal({ userDeleteHandler }) {
  return (
    <Container>
      <div>회원 탈퇴</div>
      <div className="warning">
        🚨탈퇴를 누르시면 모든 회원 정보가 삭제됩니다
      </div>
      <div>
        <CustomButton handler={userDeleteHandler} name={'탈퇴'} />
      </div>
    </Container>
  );
}

export default DeleteModal;

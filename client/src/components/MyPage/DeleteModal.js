import React from 'react';
import styled from 'styled-components';

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
        <button onClick={userDeleteHandler}>탈퇴</button>
      </div>
    </Container>
  );
}

export default DeleteModal;

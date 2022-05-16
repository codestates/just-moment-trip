import React from 'react';
import styled from 'styled-components';
import CustomButton from './CustomButton';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleExclamation } from '@fortawesome/free-solid-svg-icons';

const Container = styled.div`
  text-align: center;
  font-size: 50px;
  color: black;
  font-family: ManfuMedium;

  > h2 {
    color: rgb(89, 72, 135);
  }
  > .warning {
    color: red;
    font-size: 30px;
    margin: 30px;
  }
`;

function DeleteModal({ userDeleteHandler }) {
  return (
    <Container>
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <FontAwesomeIcon
          icon={faCircleExclamation}
          style={{ flex: '3 0 0 ' }}
        />
        <h2>회원 탈퇴</h2>
        <FontAwesomeIcon
          icon={faCircleExclamation}
          style={{ flex: '3 0 0 ' }}
        />
      </div>
      <div className="warning">진행하시면 회원정보 및</div>
      <div className="warning">작성하신 모든 글이 삭제됩니다</div>
      <div className="warning">다시 되돌리실수 없습니다</div>
      <CustomButton
        handler={userDeleteHandler}
        name={'진행'}
        color={'red'}
        font={'ManfuMedium'}
        backgroundColor={'rgba(255,102,102,0.3)'}
      />
    </Container>
  );
}

export default DeleteModal;

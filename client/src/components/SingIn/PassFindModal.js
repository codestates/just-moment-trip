import React, { useState } from 'react';
import styled from 'styled-components';
import CustomButton from '../MyPage/CustomButton';

const Container = styled.div`
  text-align: center;
  font-size: 25px;
  color: black;
  font-family: ManfuMedium;
`;

const Input = styled.input`
  text-align: center;
  font-family: ManfuMedium;
  background-color: transparent;
  width: 40vw;
  outline: none;
  border-top: none;
  border-right: none;
  border-left: none;
  border-bottom: 1px solid gray;
  font-size: 0.8em;
  margin: 50px 0;
  :hover {
    border-bottom: 2px solid rgb(89, 72, 135);
    transition: all 0.2s linear;
    transform: scale(1.05);
  }
  :focus {
    transition: all 0.4s ease-in;
    border: 1px solid rgb(89, 72, 135);
  }
`;

function DeleteModal({ passwordFindRequest }) {
  const [email, setEmail] = useState('');

  const onChange = e => {
    setEmail(e.target.value);
  };
  return (
    <Container>
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <h2>비밀번호 찾기</h2>
      </div>
      <div>이메일을 입력하시면 임시 비밀번호를 보내드립니다</div>
      <Input
        type="email"
        placeholder="email을 입력해주세요"
        autoComplete="off"
        onChange={onChange}
      />
      <CustomButton
        handler={() => passwordFindRequest(email)}
        name={'보내기'}
        color={'red'}
        font={'ManfuMedium'}
        backgroundColor={'rgba(180, 180, 251, 0.8)'}
      />
    </Container>
  );
}

export default DeleteModal;

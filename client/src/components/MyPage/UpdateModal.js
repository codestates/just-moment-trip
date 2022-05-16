import React, { useState } from 'react';
import styled from 'styled-components';
import CustomButton from './CustomButton';

const Container = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  text-align: center;
  font-size: 50px;
  color: rgb(89, 72, 135);
  font-family: ManfuMedium;

  > * {
    margin: 10px;
  }
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

function UpdateModal({ userPatchHandler }) {
  const [inputs, setInputs] = useState({
    email: '',
    password: '',
    new_password: '',
    newpasswordCheck: '',
  });

  const onChange = e => {
    const { value, name } = e.target; // 우선 e.target 에서 name 과 value 를 추출
    setInputs({
      ...inputs, // 기존의 input 객체를 복사한 뒤
      [name]: value, // name 키를 가진 값을 value 로 설정
    });
  };

  return (
    <Container onChange={onChange}>
      <h2>회원정보 수정</h2>
      <Input type="email" placeholder="Email" name="email" />
      <Input type="password" placeholder="Current Password" name="password" />
      <Input type="password" placeholder="New Password" name="new_password" />
      <Input
        type="password"
        placeholder="Check New Password"
        name="newpasswordCheck"
      />
      <CustomButton
        handler={() => userPatchHandler(inputs)}
        name={'수정'}
        color={'orange'}
        font={'ManfuMedium'}
        backgroundColor={'rgba(255,127,80, 0.3)'}
      />
    </Container>
  );
}

export default UpdateModal;

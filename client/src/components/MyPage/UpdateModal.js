import React, { useState } from 'react';
import styled from 'styled-components';
import CustomButton from './CustomButton';

const Container = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  text-align: center;
  font-size: 50px;
  color: black;
`;

const Input = styled.input`
  border: none;
  border-bottom: 3px solid black;
  background-color: inherit;
  width: 50%;
  margin: 20px;
  padding: 10px;
  font-size: 25px;
  text-align: center;
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
      <div>회원정보 수정</div>
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
      />
    </Container>
  );
}

export default UpdateModal;

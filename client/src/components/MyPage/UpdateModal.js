import React, { useState } from 'react';
import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  text-align: center;
  font-size: 50px;
  color: black;

  > input {
    width: 50%;
    margin: 20px;
    text-align: center;
  }
`;

function UpdateModal({ userPatchHandler }) {
  const [inputs, setInputs] = useState({
    email: '',
    password: '',
    newpassword: '',
    newpasswordCheck: '',
  });

  const onChange = e => {
    const { value, name } = e.target; // 우선 e.target 에서 name 과 value 를 추출
    console.log(`${value} + ${name}`);
    setInputs({
      ...inputs, // 기존의 input 객체를 복사한 뒤
      [name]: value, // name 키를 가진 값을 value 로 설정
    });
  };

  return (
    <Container onChange={onChange}>
      <div>회원정보 수정</div>
      <input type="email" placeholder="Email" name="email" />
      <input type="password" placeholder="Current Password" name="password" />
      <input type="password" placeholder="New Password" name="newpassword" />
      <input
        type="password"
        placeholder="Check New Password"
        name="newpasswordCheck"
      />
      <button
        onClick={(email, password, newpassword, newpasswordCheck) =>
          userPatchHandler(email, password, newpassword, newpasswordCheck)
        }
      >
        수정
      </button>
    </Container>
  );
}

export default UpdateModal;

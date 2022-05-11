import React from 'react';
import styled from 'styled-components';

const Message = styled.div`
  font-size: 50px;
  margin-top: 100px;
`;

const LoginMessage = () => {
  return <Message>로그인 해주세요</Message>;
};

export default LoginMessage;

import React, { useEffect } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';

const Message = styled.div`
  font-size: 50px;
  margin-top: 100px;
`;

const LoginMessage = () => {
  const navigate = useNavigate();
  const goHome = () => {
    alert('로그인부터 하십시요');
    navigate('/');
  };

  useEffect(() => {
    goHome();
  }, []);

  return <></>;
};

export default LoginMessage;

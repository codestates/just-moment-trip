import React from 'react';
import styled from 'styled-components';
import AccountStore from '../components/Account/AccountStore';
import Navbar from '../components/common/Navbar';
import LoginMessage from '../components/common/LoginMessage';

const Box = styled.div`
  display: flex;
  justify-content: center;
  border: 10px solid #312352;
  font-family: SBFont;
`;

function Account() {
  const isLogin = false; //상태에서 받아와야함
  return isLogin ? (
    <>
      <Navbar />
      <Box>
        <AccountStore />
      </Box>
    </>
  ) : (
    <>
      <Navbar />
      <LoginMessage />
    </>
  );
}

export default Account;

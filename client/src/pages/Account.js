import React from 'react';
import styled from 'styled-components';
import AccountStore from '../components/Account/AccountStore';
import Navbar from '../components/common/Navbar';
import LoginMessage from '../components/common/LoginMessage';
import { useSelector } from 'react-redux';

const Box = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: SsurroundFont;
`;

function Account() {
  const isLogin = useSelector(state => state.sign.isLoggedIn);

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

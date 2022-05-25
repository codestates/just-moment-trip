import React from 'react';
import styled from 'styled-components';
import AccountStore from '../components/Account/AccountStore';
import Navbar from '../components/common/Navbar';
import LoginMessage from '../components/common/LoginMessage';
import { useSelector } from 'react-redux';

//리펙토링 : 사이드메뉴 나오게해서 거기에 데이터값보이게하든 해야할듯

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

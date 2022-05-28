import React from 'react';
import styled from 'styled-components';
import AccountStore from '../components/Account/AccountStore';
import Navbar from '../components/common/Navbar';
import LoginTripMessage from '../components/common/LoginTripMessage';
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
  const isTrip = JSON.parse(sessionStorage.getItem('trip_id'));

  return isLogin ? (
    isTrip ? (
      <>
        <Navbar />
        <Box>
          <AccountStore />
        </Box>
      </>
    ) : (
      <>
        <Navbar />
        <LoginTripMessage redirect={'/trip'} />
      </>
    )
  ) : (
    <>
      <Navbar />
      <LoginTripMessage redirect={'/'} />
    </>
  );
}

export default Account;

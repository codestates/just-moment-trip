import React from 'react';
import styled from 'styled-components';
import Navbar from '../components/common/Navbar';
import InfoButton from '../components/MyPage/InfoButton';
import LoginMessage from '../components/common/LoginMessage';

function MyPage() {
  const isLogin = true;
  return isLogin ? (
    <>
      <Navbar />
      <InfoButton />
    </>
  ) : (
    <>
      <Navbar />
      <LoginMessage />
    </>
  );
}

export default MyPage;

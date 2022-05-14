import React from 'react';
import Navbar from '../components/common/Navbar';
import InfoButton from '../components/MyPage/InfoButton';
import LoginMessage from '../components/common/LoginMessage';
import { useSelector } from 'react-redux';
import ChatTest from '../ChatTest';

function MyPage() {
  const isLogin = useSelector(state => state.sign.isLoggedIn);
  console.log(isLogin);
  return isLogin ? (
    <>
      <Navbar />
      <InfoButton />
      <div>
        <ChatTest dispaly="blue"></ChatTest>
      </div>
    </>
  ) : (
    <>
      <Navbar />
      <LoginMessage />
    </>
  );
}

export default MyPage;

import React from 'react';
import Navbar from '../components/common/Navbar';
import InfoButton from '../components/MyPage/InfoButton';
import LoginTripMessage from '../components/common/LoginTripMessage';
import { useSelector } from 'react-redux';

function MyPage() {
  const isLogin = useSelector(state => state.sign.isLoggedIn);
  return isLogin ? (
    <>
      <Navbar />
      <InfoButton />
    </>
  ) : (
    <>
      <Navbar />
      <LoginTripMessage redirect={'/'} />
    </>
  );
}

export default MyPage;

import React from 'react';
import { useSelector } from 'react-redux';
import Navbar from '../components/common/Navbar';
import Trip from '../components/Trip/trip';
import LoginMessage from '../components/common/LoginMessage';

function TripPage() {
  const isLogin = useSelector(state => state.sign.isLoggedIn);
  return isLogin ? (
    <>
      <Navbar />
      <Trip />
    </>
  ) : (
    <>
      <Navbar />
      <LoginMessage />
    </>
  );
}

export default TripPage;

import React from 'react';
import DiaryStore from '../components/Diary/DiaryStore';
import styled from 'styled-components';
import Navbar from '../components/common/Navbar';
import LoginTripMessage from '../components/common/LoginTripMessage';
import { useSelector } from 'react-redux';

// 카드 클릭했을 때 모션?이 있어야하나..? 리펙토링할때는 못할것같다만

const Box = styled.div`
  padding-top: 150px;
  display: flex;
  justify-content: center;
  background-color: rgb(211, 226, 244);
  height: auto;
  font-family: SsurroundFont;
`;

function Diary() {
  const isLogin = useSelector(state => state.sign.isLoggedIn);
  const isTrip = JSON.parse(sessionStorage.getItem('trip_id'));

  return isLogin ? (
    isTrip ? (
      <>
        <Navbar />
        <Box>
          <DiaryStore />
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

export default Diary;

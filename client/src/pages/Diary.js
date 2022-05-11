import React from 'react';
import DiaryList from '../components/Diary/DiaryList';
import DiaryStore from '../components/Diary/DiaryStore';
import styled from 'styled-components';
import Navbar from '../components/common/Navbar';
import LoginMessage from '../components/common/LoginMessage';

const Box = styled.div`
  display: flex;
  justify-content: center;
  border: 10px solid red;
  height: 100vw;
  /* overflow: auto; */
`;

function Diary() {
  const isLogin = false; // 상태에서 받아와야함

  return isLogin ? (
    <>
      <Navbar />
      <Box>
        <DiaryStore />
      </Box>
    </>
  ) : (
    <>
      <Navbar />
      <LoginMessage />
    </>
  );
}

export default Diary;

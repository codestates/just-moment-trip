import React from 'react';
import DiaryList from '../components/Diary/DiaryList';
import DiaryStore from '../components/Diary/DiaryStore';
import styled from 'styled-components';
import Navbar from '../components/common/Navbar';

const Box = styled.div`
  display: flex;
  justify-content: center;
  border: 10px solid red;
  height: 100vw;
  /* overflow: auto; */
`;

function Diary() {
  return (
    <>
      <Navbar />
      <Box>
        <DiaryStore />
      </Box>
    </>
  );
}

export default Diary;

import React from 'react';
import DiaryList from '../components/Diary/DiaryList';
import DiaryStore from '../components/Diary/DiaryStore';
import styled from 'styled-components';

const Box = styled.div`
  display: flex;
  justify-content: center;
  border: 10px solid red;
`;

function Diary() {
  return (
    <Box>
      니하오!
      <DiaryStore>
        <DiaryList />
      </DiaryStore>
    </Box>
  );
}

export default Diary;

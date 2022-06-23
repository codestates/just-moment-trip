import React from 'react';
import styled from 'styled-components';
import Navbar from '../components/common/Navbar';
import PostWriteUpDetail from '../components/Post/PostWriteUpDetail';

const Box = styled.div`
  padding-top: 120px;
  display: flex;
  justify-content: center;
  background-color: transparent;
  /* background-color: cornflowerblue; */
  height: 100vh;
  font-family: SsurroundFont;
`;

function PostWriteUp() {
  return (
    <Box>
      <Navbar />
      <PostWriteUpDetail />
    </Box>
  );
}

export default PostWriteUp;

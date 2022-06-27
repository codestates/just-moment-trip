import React from 'react';
import styled from 'styled-components';
import Navbar from '../components/common/Navbar';
import PostViewDetail from '../components/Post/PostViewDetail';

const Box = styled.div`
  padding-top: 120px;
  display: flex;
  justify-content: center;
  background-color: transparent;
  /* background-color: cornflowerblue; */
  height: 100vh;
  font-family: SsurroundFont;
`;

function PostView() {
  return (
    <Box>
      <Navbar />
      <PostViewDetail />
    </Box>
  );
}

export default PostView;

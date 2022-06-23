import React from 'react';
import styled from 'styled-components';
import Navbar from '../components/common/Navbar';
import PostList from '../components/Post/PostList';

// import { useSelector } from 'react-redux';

const Box = styled.div`
  padding-top: 120px;
  display: flex;
  justify-content: center;
  background-color: transparent;
  /* background-color: cornflowerblue; */
  height: 100vh;
  font-family: SsurroundFont;
`;

function Post() {
  // const isLogin = useSelector(state => state.sign.isLoggedIn);
  // const isTrip = JSON.parse(sessionStorage.getItem('trip_id'));

  return (
    <Box>
      <Navbar />
      <PostList />
    </Box>
  );
}

export default Post;

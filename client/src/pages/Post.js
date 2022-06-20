import React from 'react';
import PostStore from '../components/Post/PostStore';
import Navbar from '../components/common/Navbar';
import styled from 'styled-components';
import LoginTripMessage from '../components/common/LoginTripMessage';
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
      <PostStore />
    </Box>
  );
}

export default Post;

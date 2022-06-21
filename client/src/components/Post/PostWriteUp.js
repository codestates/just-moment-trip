import React from 'react';
import { useLocation } from 'react-router-dom';
import Navbar from '../common/Navbar';
import PostStore from './PostStore';
import { Box } from './styles';

function PostWriteUp({ datas, test }) {
  const location = useLocation();
  console.log('---------------PostWriteUp', location);

  return (
    <Box>
      <Navbar />
      <div>
        <h1>아오빡쳐</h1>
      </div>
    </Box>
  );
}

export default PostWriteUp;

import React from 'react';
import { useLocation } from 'react-router-dom';
// import {CKEditor}
import Navbar from '../common/Navbar';

import { Box } from './styles';

function PostWriteUp() {
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

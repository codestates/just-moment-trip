import React from 'react';
import styled from 'styled-components';
import AccountStore from '../components/Account/AccountStore';
import Navbar from '../components/common/Navbar';

const Box = styled.div`
  display: flex;
  justify-content: center;
  border: 10px solid #312352;
`;

function Account() {
  return (
    <>
      <Navbar />
      <Box>
        <AccountStore />
      </Box>
      <div
        style={{
          position: 'fixed',
          bottom: 0,
          left: 0,
          right: 0,
          backgroundColor: 'rgb(211, 226, 244)',
          padding: '20px',
          height: '20px',
          width: '100%',
        }}
      >
        13131231
      </div>
    </>
  );
}

export default Account;

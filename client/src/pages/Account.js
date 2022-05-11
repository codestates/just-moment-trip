import React from 'react';
import styled from 'styled-components';
import AccountStore from '../components/Account/AccountStore';
import Navbar from '../components/common/Navbar';

const Box = styled.div`
  display: flex;
  justify-content: center;
  border: 10px solid #312352;
  font-family: SBFont;
`;

function Account() {
  return (
    <>
      <Navbar />
      <Box>
        <AccountStore />
      </Box>
    </>
  );
}

export default Account;

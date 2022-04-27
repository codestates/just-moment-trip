import React from 'react';
import styled from 'styled-components';
import AccountStore from '../components/Account/AccountStore';
import AccountList from '../components/Account/AccountList';
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
        <AccountStore>
          <AccountList />
        </AccountStore>
      </Box>
    </>
  );
}

export default Account;

import React from 'react';
import styled from 'styled-components';
import AccountList from '../components/Account/AccountList';
import AccountStore from '../components/Account/AccountStore';
import Footer from '../components/common/Footer';
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
    </>
  );
}

export default Account;

import React from 'react';
import styled from 'styled-components';

import Navbar from './Navbar';

function Layout({ children }) {
  return (
    <>
      <Navbar />
      {children}
    </>
  );
}

export default Layout;

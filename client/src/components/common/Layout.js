import React from 'react';
import styled from 'styled-components';

import Navbar from './Navbar';

function Layout({ Children }) {
  return (
    <>
      <Navbar />
      <main> {Children}</main>
    </>
  );
}

export default Layout;

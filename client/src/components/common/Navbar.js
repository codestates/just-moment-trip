import React from 'react';

import { Link } from 'react-router-dom';
import styled from 'styled-components';

const NavbarBox = styled.div`
  display: flex;
  position: fixed;
  justify-content: space-between;
  top: 0;
  left: 0;
  right: 0;
  font-size: 20px;
  font-family: ManfuMedium;
  padding: 20px 0px;
  width: 100%;
  background-color: #b39bf2;
  z-index: 100;
`;

function Navbar() {
  return (
    <NavbarBox>
      <div>
        <div className="Navbar_1" style={{ padding: '0 5px' }}>
          <Link style={{ textDecoration: 'none', color: 'black' }} to="/">
            HOME
          </Link>
        </div>
      </div>
      <div style={{ display: 'flex' }}>
        <div className="Navbar_2" style={{ padding: '0 5px' }}>
          <Link style={{ textDecoration: 'none', color: 'black' }} to="/trip">
            TRIP
          </Link>
        </div>
        <div className="Navbar_3" style={{ padding: '0 5px' }}>
          <Link style={{ textDecoration: 'none', color: 'black' }} to="/diary">
            DIARY
          </Link>
        </div>
        <div className="Navbar_4" style={{ padding: '0 5px' }}>
          <Link
            style={{ textDecoration: 'none', color: 'black' }}
            to="/account"
          >
            ACCOUNT
          </Link>
        </div>{' '}
        <div className="Navbar_5" style={{ padding: '0 5px' }}>
          <Link style={{ textDecoration: 'none', color: 'black' }} to="/mypage">
            MYPAGE
          </Link>
        </div>
        <div className="Navbar_6" style={{ padding: '0 5px' }}>
          <Link
            style={{ textDecoration: 'none', color: 'black' }}
            to="/aboutUs"
          >
            ABOUTUS
          </Link>
        </div>
        <div className="Navbar_6" style={{ padding: '0 5px' }}>
          <Link style={{ textDecoration: 'none', color: 'black' }} to="/info">
            INFO
          </Link>
        </div>
      </div>
    </NavbarBox>
  );
}

export default Navbar;

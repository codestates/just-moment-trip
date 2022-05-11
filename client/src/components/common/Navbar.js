import React from 'react';

import { Link } from 'react-router-dom';
import styled from 'styled-components';

const NavbarBox = styled.div`
  display: flex;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  font-size: 20px;
  font-family: SBFont;
  padding: 20px 0px;
  width: 100%;
  background-color: #b39bf2;
`;

function Navbar() {
  return (
    <NavbarBox>
      <div className="Navbar_1">
        <Link style={{ textDecoration: 'none', color: 'black' }} to="/">
          Home
        </Link>
      </div>
      <div className="Navbar_2">
        <Link style={{ textDecoration: 'none', color: 'black' }} to="/diary">
          Diary
        </Link>
      </div>
      <div className="Navbar_3">
        <Link style={{ textDecoration: 'none', color: 'black' }} to="/account">
          Account
        </Link>
      </div>{' '}
      <div className="Navbar_4">
        <Link style={{ textDecoration: 'none', color: 'black' }} to="/mypage">
          Mypage
        </Link>
      </div>
      <div className="Navbar_5">
        <Link style={{ textDecoration: 'none', color: 'black' }} to="/aboutUs">
          AboutUs
        </Link>
      </div>
    </NavbarBox>
  );
}

export default Navbar;

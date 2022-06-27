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
  font-size: 1em;
  font-family: ManfuMedium;
  padding: 1em 5px;
  width: 100%;
  background-color: rgb(72, 56, 137);
  z-index: 100;
`;

const NavDivBox = styled.div`
  padding: 0 5px;
  :hover {
    transition: all 0.4s ease-in;
    border-top: 1px solid pink;
  }
`;

function Navbar() {
  return (
    <NavbarBox>
      <div>
        <NavDivBox>
          <Link
            style={{
              textDecoration: 'none',
              color: 'whitesmoke',
            }}
            to="/"
          >
            HOME
          </Link>
        </NavDivBox>
      </div>
      <div style={{ display: 'flex' }}>
        <NavDivBox>
          <Link
            style={{ textDecoration: 'none', color: 'whitesmoke' }}
            to="/trip"
          >
            TRIP
          </Link>
        </NavDivBox>
        <NavDivBox>
          <Link
            style={{ textDecoration: 'none', color: 'whitesmoke' }}
            to="/diary"
          >
            DIARY
          </Link>
        </NavDivBox>
        <NavDivBox>
          <Link
            style={{ textDecoration: 'none', color: 'whitesmoke' }}
            to="/account"
          >
            ACCOUNT
          </Link>
        </NavDivBox>

        <NavDivBox>
          <Link
            style={{ textDecoration: 'none', color: 'whitesmoke' }}
            to="/post"
          >
            BOARD
          </Link>
        </NavDivBox>

        <NavDivBox>
          <Link
            style={{ textDecoration: 'none', color: 'whitesmoke' }}
            to="/mypage"
          >
            MYPAGE
          </Link>
        </NavDivBox>
        <NavDivBox>
          <Link
            style={{ textDecoration: 'none', color: 'whitesmoke' }}
            to="/aboutUs"
          >
            ABOUTUS
          </Link>
        </NavDivBox>
        <NavDivBox>
          <Link
            style={{ textDecoration: 'none', color: 'whitesmoke' }}
            to="/info"
          >
            INFO
          </Link>
        </NavDivBox>
      </div>
    </NavbarBox>
  );
}

export default Navbar;

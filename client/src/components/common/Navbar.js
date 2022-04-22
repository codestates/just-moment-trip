import React from 'react';

import { Link } from 'react-router-dom';

function Navbar() {
  return (
    <div className="Navbar">
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
        <Link style={{ textDecoration: 'none', color: 'black' }} to="/mypage">
          Mypage
        </Link>
      </div>
      <div className="Navbar_4">
        <Link style={{ textDecoration: 'none', color: 'black' }} to="/account">
          Account
        </Link>
      </div>
    </div>
  );
}

export default Navbar;

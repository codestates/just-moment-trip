import React from 'react';
import Navbar from '../components/common/Navbar';

function MyPage() {
  return (
    <>
      <div>
        <Navbar />
        <h1 style={{ fontSize: 50 }}>
          {' '}
          🚧 공사중입니다 🚧 <br /> 돌아가세요
        </h1>
      </div>
    </>
  );
}

export default MyPage;

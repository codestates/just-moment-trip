import React from 'react';
import Navbar from '../components/common/Navbar';
import AccountInfo from '../components/Info/AccountInfo';
import DiaryInfo from '../components/Info/DiaryInfo';
import GraphInfo from '../components/Info/GraphInfo';

function Info() {
  return (
    <>
      <Navbar />
      <DiaryInfo />
      <AccountInfo />
      <GraphInfo />
    </>
  );
}

export default Info;

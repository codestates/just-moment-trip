import React from 'react';
import Navbar from '../components/common/Navbar';
import AccountInfo from '../components/Info/AccountInfo';
import DiaryInfo from '../components/Info/DiaryInfo';
import GraphInfo from '../components/Info/GraphInfo';
import TripInfo from '../components/Info/TripInfo';

function Info() {
  return (
    <>
      <Navbar />
      <TripInfo />
      <DiaryInfo />
      <AccountInfo />
      <GraphInfo />
    </>
  );
}

export default Info;

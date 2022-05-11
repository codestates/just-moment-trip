import React from 'react';
import styled from 'styled-components';
import AccountPieChart from '../Account/AccountPieChart';

function GraphInfo() {
  const dummyData = [
    {
      category: '식비',
      price: 15500,
    },
    {
      category: '교통비',
      price: 27000,
    },
    {
      category: '숙박비',
      price: 32000,
    },
    {
      category: '티켓',
      price: 22000,
    },
    {
      category: '기념품',
      price: 15000,
    },
    {
      category: '기타',
      price: 17000,
    },
  ];

  return <AccountPieChart data={dummyData} />;
}

export default GraphInfo;

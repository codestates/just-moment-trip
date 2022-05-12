import React from 'react';
import styled from 'styled-components';
import AccountPieChart from '../Account/AccountPieChart';
import Container from './Container';

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

  return (
    <Container direction={'column'} back={' rgba(100, 100, 100, .4)'}>
      <AccountPieChart data={dummyData} />
      <div className="message">쉽게 한눈에 통계를 확인해 보세요</div>
    </Container>
  );
}

export default GraphInfo;

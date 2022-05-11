import React from 'react';
import styled from 'styled-components';
import AccountPieChart from '../Account/AccountPieChart';

const Container = styled.div`
  margin: 100px;
  display: flex;
  height: 80%;
  justify-content: space-around;
`;

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
    <Container>
      <AccountPieChart data={dummyData} />
      지출내역을 한눈에 확인해 보세요
    </Container>
  );
}

export default GraphInfo;

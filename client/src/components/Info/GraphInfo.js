import React from 'react';
import AccountPieChart from '../Account/AccountPieChart';
import Container from './Container';
import Modal from '../common/Modal';

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
      <Modal name={'그래프보시려면클릭하세요'}>
        <AccountPieChart data={dummyData} target_currency={'원'} />
      </Modal>
      <div className="message">쉽게 한눈에 통계를 확인해 보세요</div>
    </Container>
  );
}

export default GraphInfo;

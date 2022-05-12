import React from 'react';
import styled from 'styled-components';
import AccountItem from '../Account/AccountEditor';
import Swal from 'sweetalert2';
import Container from './Container';

function AccountInfo() {
  const dummyData = {
    onEdit: () => {
      Swal.fire('로그인후 Account에서 체험하세요');
    },
    onRemove: () => {
      Swal.fire('로그인후 Account에서 체험하세요');
    },
    id: 1000,
    item_name: '구미 디즈니랜드 티켓',
    price: 135000,
    category: '티켓',
    target_currency: 'KRW',
    spent_person: '나다',
    memo: '구경할께 많았다',
    write_date: '2022-07-01',
  };
  return (
    <Container direction={'row'} back={' rgba(0, 0, 255, .4)'}>
      <span>
        <AccountItem {...dummyData} />
      </span>
      <div className="message">
        여행을 다니며 간단하게 가계부를 작성하여 {<br />}
        지출내역을 효율적으로 관리하며
      </div>
    </Container>
  );
}

export default AccountInfo;

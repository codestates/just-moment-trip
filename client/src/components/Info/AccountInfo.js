import React from 'react';
import styled from 'styled-components';
import AccountItem from '../Account/AccountEditor';
import Swal from 'sweetalert2';

function AccountInfo() {
  const dummyData = {
    onEdit: () => {
      Swal.fire('로그인후 Account에서 체험하세요');
    },
    onRemove: () => {
      Swal.fire('로그인후 Account에서 체험하세요');
    },
    id: 1000000,
    item_name: '구미 디즈니랜드 티켓',
    price: 135000,
    category: '티켓',
    target_currency: 'KRW',
    spent_person: '나다',
    memo: '구경할께 많았다',
    write_date: '2022-07-01',
  };
  return <AccountItem {...dummyData} />;
}

export default AccountInfo;

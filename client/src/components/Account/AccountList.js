import React from 'react';
import Footer from '../common/Footer';
import Modal from '../common/Modal';
import AccountEditor from './AccountEditor';
import AccountPieChart from './AccountPieChart';
import AccountWriteUp from './AccountWriteUp';
import styled from 'styled-components';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPen } from '@fortawesome/free-solid-svg-icons';

const some = <FontAwesomeIcon icon={faPen} />;

const ModalBox = styled.div`
  display: flex;
`;

const AccountListBox = styled.div`
  text-align: center;
`;

function AccountList({
  data,
  onEdit,
  onRemove,
  onCreate,
  totalSpentString,
  remainingString,
  PercentageOfAmountUsed,
}) {
  // const a = new Date().toLocaleString();
  return (
    <div className="AccountList">
      <div className="AccountListSpanBox">
        <h4>{AccountList.length}개의 기록이 있어요 !</h4>
        <ModalBox>
          <Modal name={some}>
            <AccountWriteUp onCreate={onCreate} />
          </Modal>
          <Modal name={some}>
            <AccountPieChart data={data} />
          </Modal>
        </ModalBox>
      </div>
      <AccountListBox>
        {data.map(it => (
          <AccountEditor
            key={it.id}
            {...it}
            onEdit={onEdit}
            onRemove={onRemove}
            onCreate={onCreate}
            AccountList={AccountList}
          />
        ))}
      </AccountListBox>
      <Footer
        totalSpentString={totalSpentString}
        remainingString={remainingString}
        PercentageOfAmountUsed={PercentageOfAmountUsed}
      />
    </div>
  );
}

AccountList.defaultProps = {
  AccountList: ['에러발생 !'],
};

export default AccountList;

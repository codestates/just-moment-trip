import React from 'react';
import Footer from '../common/Footer';
import Modal from '../common/Modal';
import AccountEditor from './AccountEditor';
import AccountPieChart from './AccountPieChart';
import AccountWriteUp from './AccountWriteUp';
import styled, { keyframes } from 'styled-components';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPen, faChartPie } from '@fortawesome/free-solid-svg-icons';

let AccountModalBtnAnimation = keyframes`
  50% {top: 0; opacity: 1}
  100% {top: -300px; opacity: 0}
  `;

const IconBtn = styled.div`
  animation-name: ${AccountModalBtnAnimation};
  animation-duration: 0.5s;
  :hover {
    transition: all 0.2s linear;
    transform: scale(1.2);
  }
`;

const penIcon = (
  <IconBtn>
    <FontAwesomeIcon icon={faPen} />
  </IconBtn>
);
const ChartPieIcon = (
  <IconBtn>
    <FontAwesomeIcon icon={faChartPie} />
  </IconBtn>
);

const ModalBox = styled.div`
  display: flex;
  justify-content: center;
`;

const AccountListBox = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(400px, 1fr));
  text-align: center;
  height: 100%;
  width: 100%;
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
          <Modal name={penIcon}>
            <AccountWriteUp onCreate={onCreate} />
          </Modal>
          <Modal name={ChartPieIcon}>
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

import React from 'react';
import { useEffect } from 'react';
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
  grid-template-columns: repeat(auto-fill, minmax(410px, 1fr));
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
    <>
      <div className="AccountList">
        <div
          className="AccountListSpanBox"
          style={{
            textAlign: 'center',
          }}
        >
          <p style={{ fontSize: '20px' }}>
            <span style={{ fontSize: '40px' }}>{data.length}</span>개의 기록이
            있어요 !
          </p>
          <ModalBox>
            <Modal name={penIcon}>
              <AccountWriteUp onCreate={onCreate} />
            </Modal>
            <Modal name={ChartPieIcon}>
              <AccountPieChart data={data} />
            </Modal>
          </ModalBox>
        </div>
        {/* <div style={{ backgroundColor: 'red',}}> */}
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
        {/* </div> */}

        <Footer
          totalSpentString={totalSpentString}
          remainingString={remainingString}
          PercentageOfAmountUsed={PercentageOfAmountUsed}
        />
      </div>
    </>
  );
}

AccountList.defaultProps = {
  AccountList: ['에러발생 !'],
};

export default AccountList;

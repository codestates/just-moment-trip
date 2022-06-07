import React, { useEffect } from 'react';
import { useState } from 'react';
import Footer from '../common/Footer';
import Modal from '../common/Modal';
import AccountEditor from './AccountEditor';
import AccountPieChart from './AccountPieChart';
import AccountWriteUp from './AccountWriteUp';
import Swal from 'sweetalert2';
import styled, { keyframes } from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faPen,
  faChartPie,
  faQuestionCircle,
} from '@fortawesome/free-solid-svg-icons';
import parrot9 from '../../Assets/parrot9.gif';
import Loding from '../common/Loding';
import TopBtn from '../common/TopBtn';

const AccountModalBtnAnimation = keyframes`
  50% {top: 0; opacity: 1}
  100% {top: -300px; opacity: 0}
  `;

// const BingBing = `
//   0%{transform:rotate(0deg);}
//   100%{transform:rotate(360deg);}
// `;

const ChangeColor = keyframes`
14% {color:red}
28% {color:orange}
42% {color:yellow}
56% {color:green}
70% {color:blue}
84% {color:navy}
98% {color:purple}

`;

const IconBtn = styled.div`
  animation-name: ${AccountModalBtnAnimation};
  animation-duration: 0.5s;
  :hover {
    transition: all 0.2s linear;
    transform: scale(1.2);
  }
`;

const HelpBtnBox = styled.button`
  outline: none;
  border: none;
  size: 50px;
  padding: 20px;
  background-color: transparent;
  font-size: 20px;
  :hover {
    transition: all 0.2s linear;
    transform-origin: 0% 100%;
    animation: ${ChangeColor} 1.5s linear infinite;
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
  target_currency,
  exchange_rate,
}) {
  const [loading, setLoding] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setLoding(false);
    }, 2500);
  }, [data]);

  //!-----------------
  const helpBtnFx = () => {
    let timerInterval;
    Swal.fire({
      width: 800,
      height: 900,
      title: `✏️ 를 누르면 기록을 남길 수 있어요

      QUIZ ! 피자모양은 뭘까요 🐝? 

      MISSION ! 숨겨진 지도를 찾아보세요 🗺️`,
      html: '사라지기까지 앞으로 <b></b>!',
      timer: 2000,
      timerProgressBar: true,
      backdrop: `
      rgba(0,0,110,0.5)
      url(${parrot9})
      top
      no-repeat
    `,
      didOpen: () => {
        Swal.showLoading();
        const b = Swal.getHtmlContainer().querySelector('b');
        timerInterval = setInterval(() => {
          b.textContent = Swal.getTimerLeft();
        }, 100);
      },
      willClose: () => {
        clearInterval(timerInterval);
      },
    }).then(result => {
      if (result.dismiss === Swal.DismissReason.timer) {
        ('');
      }
    });
  };
  //!-----------
  return (
    <>
      {loading ? (
        <Loding />
      ) : (
        <>
          <div className="AccountList">
            <div
              className="AccountListSpanBox"
              style={{
                textAlign: 'center',
              }}
            >
              <p style={{ fontSize: '20px' }}>
                <span style={{ fontSize: '40px' }}>{data.length}</span>개의
                기록이 있어요 !
              </p>
              <ModalBox>
                <Modal name={penIcon}>
                  <AccountWriteUp
                    onCreate={onCreate}
                    target_currency={target_currency}
                  />
                </Modal>
                <Modal name={ChartPieIcon}>
                  <AccountPieChart
                    data={data}
                    target_currency={target_currency}
                  />
                </Modal>
              </ModalBox>
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
              >
                <HelpBtnBox onClick={helpBtnFx}>
                  <FontAwesomeIcon
                    icon={faQuestionCircle}
                    style={{ fontSize: '60px' }}
                  />
                </HelpBtnBox>
              </div>
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
            <TopBtn marginBottom={3} />
            <Footer
              totalSpentString={totalSpentString}
              remainingString={remainingString}
              PercentageOfAmountUsed={PercentageOfAmountUsed}
              exchange_rate={exchange_rate}
              target_currency={target_currency}
            />
          </div>
        </>
      )}
    </>
  );
}

AccountList.defaultProps = {
  AccountList: ['에러발생 !'],
};

export default AccountList;

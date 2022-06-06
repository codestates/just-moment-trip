import React, { useRef, useState } from 'react';
import Swal from 'sweetalert2';
import styled, { keyframes } from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFilePen } from '@fortawesome/free-solid-svg-icons';
import catzzal6 from '../../Assets/catzzal6.gif';
import dogzzal from '../../Assets/dogzzal.gif';

const FilePenIcon = (
  <FontAwesomeIcon icon={faFilePen} style={{ width: '40px', height: '40px' }} />
);

const Shake = keyframes`
  0%,
  80% {
    transform: rotate(0deg);
  }
  5%,
  15%,
  25%,
  35%,
  45% {
    transform: rotate(4deg);
  }
  10%,
  40%,
  30%,
  40% {
    transform: rotate(-2deg);}
`;

const AccountWriteBtn = styled.button`
  outline: none;
  background-color: transparent;
  border: none;

  :hover {
    animation: ${Shake} 4s infinite;
  }
`;

const AccountSelectBox = styled.select`
  font-family: SsurroundFont;
  text-align: center;
  height: 30px;
  width: 120px;
  font-size: 12px;
  outline: none;
  border-top: none;
  border-right: none;
  border-left: none;
  border-bottom: 2px solid gray;
  background-color: transparent;
  color: rgb(89, 72, 135);
  :hover {
    transition: all 0.2s linear;
    transform: scale(1.05);
  }
`;

const AccountSpanBox = styled.span`
  display: flex;
  font-size: 1em;
  justify-content: space-between;
  padding: 8px 20px;
`;

const AccountEditInputBox = styled.input`
  text-align: center;
  font-family: SsurroundFont;
  background-color: transparent;
  outline: none;
  border-top: none;
  border-right: none;
  border-left: none;
  border-bottom: 2px solid gray;
  font-size: 1.05em;
  :hover {
    transition: all 0.2s linear;
    transform: scale(1.2);
  }
  :focus {
    transition: all 0.4s ease-in;
    border-bottom: 2px solid pink;
  }
`;

const Test = styled.textarea`
  text-align: center;
  font-family: SsurroundFont;
  background-color: transparent;
  outline: none;
  padding-top: 15px;
  height: 80px;
  width: 90%;
  resize: none;
  border-top: none;
  border-right: none;
  border-left: none;
  border-bottom: 2px solid gray;
  font-size: 0.8em;
  :hover {
    transition: all 0.2s linear;
    transform: scale(1.2);
  }
  :focus {
    transition: all 0.4s ease-in;
    border-bottom: 2px solid pink;
  }
`;

const PriceInputBox = styled.input`
  text-align: center;
  font-family: SsurroundFont;
  background-color: transparent;
  border-top: none;
  border-right: none;
  border-left: none;
  border-bottom: 2px solid gray;
  outline: none;
  font-size: 1.05em;

  ::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
  ::-webkit-outer-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
  :hover {
    transition: all 0.2s linear;
    transform: scale(1.2);
  }
  :focus {
    transition: all 0.4s ease-in;
    border-bottom: 2px solid pink;
  }
`;

const AccountWriteUpBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 30px;
  height: 80%;
  font-size: 20px;
  align-items: center;
  text-align: center;
  color: rgb(89, 72, 135);
`;

function AccountWriteUp({ onCreate, openModalHandler, target_currency }) {
  const item_nameInput = useRef();
  const priceInput = useRef();
  const spent_personInput = useRef();
  const target_currencyInput = useRef();
  const memoInput = useRef();

  const [state, setState] = useState({
    write_date: '',
    item_name: '',
    target_currency: '',
    spent_person: '',
    price: '',
    memo: '',
    category: '식비',
    gps: '',
  });
  let gps = `${sessionStorage.getItem('latitude')},${sessionStorage.getItem(
    'longitude',
  )}`;
  const handleChangeState = e => {
    setState({ ...state, gps: gps, [e.target.name]: e.target.value });
    // name : value
    //ex) input에 입력시 author(input name): e.target.value(onchange동작)
  };

  const handleSubmit = e => {
    if (state.item_name.length < 1) {
      item_nameInput.current.focus();
      return;
    }

    if (state.price.length < 1) {
      priceInput.current.focus();
      return;
    }

    if (state.spent_person.length < 1) {
      spent_personInput.current.focus();
      return;
    }

    if (state.memo.length < 1) {
      memoInput.current.focus();
      return;
    }

    Swal.fire({
      title: `기록을 저장할까요 ?`,
      icon: 'question',
      background: '#fff ',
      backdrop: `
      rgba(0,0,110,0.5)
      url(${catzzal6})
      left top
      no-repeat
    `,
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: '네',
      cancelButtonText: '아니오',
    }).then(result => {
      if (result.isConfirmed) {
        Swal.fire({
          icon: 'success',
          title: '저장 완료!',
          text: `작성하신 기록을 저장했어요`,
          confirmButtonText: '알겠어요',
          backdrop: `
          rgba(0,0,110,0.5)
          url(${dogzzal})
          left top
          no-repeat
        `,
        });
        onCreate(
          state.item_name,
          state.price,
          state.category,
          state.spent_person,
          state.memo,
          // state.new Date
          (state.write_date = new Date().getTime()),
          state.gps,
        );

        setState({
          write_date: '',
          item_name: '',
          paid_person: '',
          price: '',
          memo: '',
          category: '교통비',
          gps: '',
        });
        // console.log('AccountWriteUp', state);
        openModalHandler(false);
      }
    });
  };

  return (
    <AccountWriteUpBox>
      <div className="AccountEditorH2Box">
        <h2 className="AccountEditorH2">가계부를 기록해요</h2>
      </div>
      <div className="AccountEditorReturnDiv">
        <div className="InputFirstArea">
          {/* <span>여정 {dateDiff} 일차 !</span> */}
          <br />
          <AccountSpanBox>
            <AccountEditInputBox
              className="item_nameInput"
              ref={item_nameInput}
              value={state.item_name || ''}
              name="item_name"
              maxlength="10"
              onChange={handleChangeState}
            ></AccountEditInputBox>
            구입
          </AccountSpanBox>
        </div>
        <div className="InputSecondArea">
          <AccountSpanBox>
            <PriceInputBox
              type="number"
              className="priceInput"
              ref={priceInput}
              value={state.price || ''}
              name="price"
              maxlength="10"
              onChange={handleChangeState}
            ></PriceInputBox>
            {target_currency} 사용
          </AccountSpanBox>
        </div>
        <div className="InputThirdArea">
          <AccountSpanBox>
            돈 쓴 사람
            <AccountEditInputBox
              className="spent_personInput"
              ref={spent_personInput}
              value={state.spent_person || ''}
              name="spent_person"
              maxlength="10"
              onChange={handleChangeState}
            ></AccountEditInputBox>
          </AccountSpanBox>
        </div>
        <div className="InputForthArea">
          {/* <AccountSpanBox>
            통화
            <AccountEditInputBox
              className="target_currencyInput"
              ref={target_currencyInput}
              value={state.target_currency}
              name="target_currency"
              maxlength="3"
              onChange={handleChangeState}
            ></AccountEditInputBox>
          </AccountSpanBox> */}
        </div>
        <div className="InputFifthArea">
          <div style={{ padding: '10px 0' }}>메모</div>
          <div>
            <Test
              className="memoInput"
              ref={memoInput}
              value={state.memo}
              name="memo"
              maxlength="50"
              onChange={handleChangeState}
            ></Test>
          </div>
        </div>
      </div>
      <div
        className="InputsixthArea"
        style={{ display: 'flex', alignItems: 'center' }}
      >
        <div className="InputFifthAreaLabel " style={{ margin: '0px 20px' }}>
          소비 항목을 선택해요 :{' '}
        </div>
        <div style={{ margin: '0px 20px' }}>
          <AccountSelectBox
            style={{
              fontFamily: 'SsurroundFont',
              height: '50px',
              width: '150px',
              fontSize: '20px',
            }}
            className="select"
            name="category"
            value={state.category}
            onChange={handleChangeState}
          >
            <option value={'식비'}>식비</option>
            <option value={'교통비'}>교통비</option>
            <option value={'숙박비'}>숙박비</option>
            <option value={'티켓'}>티켓</option>
            <option value={'기념품'}>기념품</option>
            <option value={'기타'}>기타</option>
          </AccountSelectBox>
        </div>
      </div>
      <div className="InputLastArea">
        <AccountWriteBtn className="InputLastAreaBtn" onClick={handleSubmit}>
          {FilePenIcon}
        </AccountWriteBtn>
      </div>
    </AccountWriteUpBox>
  );
}

export default AccountWriteUp;

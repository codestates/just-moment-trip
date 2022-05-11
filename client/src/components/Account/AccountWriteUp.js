import React, { useRef, useState } from 'react';
import Swal from 'sweetalert2';
import styled from 'styled-components';

const PriceInputBox = styled.input`
  ::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
  ::-webkit-outer-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
`;

const AccountWriteUpBox = styled.div`
  padding: 40px;
  font-size: 20px;
  align-items: center;
  text-align: center;
`;

function AccountWriteUp({ onCreate, openModalHandler }) {
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
  });

  const handleChangeState = e => {
    setState({ ...state, [e.target.name]: e.target.value });
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

    if (state.target_currency.length < 1) {
      target_currencyInput.current.focus();
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
      url("https://velog.velcdn.com/images/do66i/post/ef963bb5-b512-4259-bb51-dbde97ca457a/image.gif")
      left top
      no-repeat
    `,
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes',
    }).then(result => {
      if (result.isConfirmed) {
        Swal.fire('저장 완료!', 'success');
        onCreate(
          state.item_name,
          state.price,
          state.category,
          state.target_currency,
          state.spent_person,
          state.memo,
          // state.new Date
          (state.write_date = new Date().getTime()),
        );

        setState({
          write_date: '',
          item_name: '',
          target_currency: '',
          paid_person: '',
          price: '',
          memo: '',
          category: '교통비',
        });
        console.log('AccountWriteUp', state);
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
          <span>여정 3일차 !</span>
          <br />
          <span className="item_nameSpan">
            <input
              className="item_nameInput"
              ref={item_nameInput}
              value={state.item_name || ''}
              name="item_name"
              onChange={handleChangeState}
            ></input>
            구입 !
          </span>
        </div>
        <div className="InputSecondArea">
          <span>
            <PriceInputBox
              type="number"
              className="priceInput"
              ref={priceInput}
              value={state.price || ''}
              name="price"
              onChange={handleChangeState}
            ></PriceInputBox>
            원 사용!
          </span>
        </div>
        <div className="InputThirdArea">
          <span>
            돈 쓴 사람
            <input
              className="spent_personInput"
              ref={spent_personInput}
              value={state.spent_person || ''}
              name="spent_person"
              onChange={handleChangeState}
            ></input>
          </span>
        </div>
        <div className="InputForthArea">
          <span>
            통화
            <input
              className="target_currencyInput"
              ref={target_currencyInput}
              value={state.target_currency}
              name="target_currency"
              onChange={handleChangeState}
            ></input>
          </span>
        </div>
        <div className="InputFifthArea">
          <span>
            멤모
            <textarea
              className="memoInput"
              ref={memoInput}
              value={state.memo}
              name="memo"
              onChange={handleChangeState}
            ></textarea>
          </span>
        </div>

        {/* <textarea ref={contentInput} value={state.content} name="content" onChange={handleChangeState} /> */}
      </div>
      <div className="InputsixthArea">
        <label className="InputFifthAreaLabel">소비 항목을 선택해요 : </label>
        <span className="selectSpan">
          <select
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
            <option value={'기타항목'}>기타항목</option>
          </select>
        </span>
      </div>
      <div className="InputLastArea">
        <button className="InputLastAreaBtn" onClick={handleSubmit}>
          ✏️
        </button>
      </div>
    </AccountWriteUpBox>
  );
}

export default AccountWriteUp;

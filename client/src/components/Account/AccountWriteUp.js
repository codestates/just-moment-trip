import React, { useRef, useState } from 'react';
const moment = require('moment');

function AccountWriteUp({ onCreate, openModalHandler }) {
  const item_nameInput = useRef();
  const priceInput = useRef();
  const spent_personInput = useRef();
  const target_currencyInput = useRef();
  const memoInput = useRef();

  // const startDate = context.state.tripList[0].start_date.split('/');
  // startDate[0] = Number(startDate[0]);
  // startDate[1] = Number(startDate[1]);
  // startDate[2] = Number(startDate[2]);
  // const newDate = new Date();
  // let nowTime = [
  //   newDate.getFullYear(),
  //   newDate.getMonth() + 1,
  //   newDate.getDate(),
  // ];
  // const dateDiff = moment(nowTime).diff(moment(startDate), 'days');

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
    // write_date = 1;
    onCreate(
      state.item_name,
      state.price,
      state.category,
      state.target_currency,
      state.spent_person,
      state.memo,
      // state.new Date
      (state.write_date = new Date().toLocaleString()),
    );
    alert('저장성공!');
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
  };

  return (
    <div className="AccountWriteUp">
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
            <input
              className="priceInput"
              ref={priceInput}
              value={state.price || ''}
              name="price"
              onChange={handleChangeState}
            ></input>
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
            <option value={'기념품'}>티켓</option>
            <option value={'기타항목'}>기타항목</option>
          </select>
        </span>
      </div>
      <div className="InputLastArea">
        <button className="InputLastAreaBtn" onClick={handleSubmit}>
          ✏️
        </button>
      </div>
    </div>
  );
}

export default AccountWriteUp;

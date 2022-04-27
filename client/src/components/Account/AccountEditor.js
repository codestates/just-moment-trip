import React, { useRef, useState } from 'react';

function AccountItem({
  onEdit,
  onRemove,
  id,
  item_name,
  price,
  category,
  target_currency,
  spent_person,
  memo,
  write_date,
}) {
  const [isEdit, setIsEdit] = useState(false);
  const toggleIsEdit = () => {
    setIsEdit(!isEdit);
  };
  const [editPrice, setEditPrice] = useState(price);
  const [editMemo, setEditMemo] = useState(memo);
  const editPriceInput = useRef();
  const editMemoInput = useRef();

  const handleRemove = () => {
    if (window.confirm(`${id + 1}번째 기록을 삭제할까요?`)) {
      onRemove(id);
    }
  };

  const handleQuitEdit = () => {
    setIsEdit(false);
    setEditPrice(price);
    setEditMemo(memo);
  };

  const handleEdit = () => {
    if (editPrice.length < 1) {
      editPriceInput.current.focus();
      return;
    }
    if (editMemo.length < 1) {
      editMemoInput.current.focus();
      return;
    }

    if (window.confirm(`${id + 1}번째 가계부를 수정할까요 ?`)) {
      onEdit(id, editPrice, editMemo);
      toggleIsEdit();
    }
  };
  return (
    <div className="AccountItem">
      <div className="info">
        <div className="infoFirstBox">
          <div className=" AccountItmeP1">구매한 사람은 {spent_person}</div>

          <div className=" AccountItmeP3">카테고리 : {category}</div>
          <div className=" AccountItmeP2">통화 : {target_currency}</div>
          <div className="dateBox">
            <span className="date">{write_date}</span>
          </div>
        </div>
      </div>
      <div className="infoFirstSecondBox">
        <div className="AccountItemItemNameBox">
          {item_name} 구입 멤:{memo}
        </div>
        {isEdit ? (
          <div className="AccountItemInputBox">
            <input
              placeholder="메모를 입력해요"
              className="AccountItemInput"
              ref={editMemoInput}
              value={editMemo}
              onChange={e => setEditMemo(e.target.value)}
            />
          </div>
        ) : (
          <div className="AccountItemContentBox">
            <div className="AccountItemContentBoxText1">
              <p>💐</p>
            </div>
            <div className="AccountItemContentBoxText2">
              <p>{memo}</p>
            </div>
          </div>
        )}
        {/*
        ?-------------------------------------------------------
        */}
        {isEdit ? (
          <div className="AccountItemInputBox">
            <input
              placeholder="사용금액을 입력해요"
              className="AccountItemInput"
              ref={editPriceInput}
              value={editPrice}
              onChange={e => setEditPrice(e.target.value)}
            />
          </div>
        ) : (
          <div className="AccountItemContentBox">
            <div className="AccountItemContentBoxText1">
              <p>💸</p>
            </div>
            <div className="AccountItemContentBoxText2">
              <p>{price}</p>
            </div>
          </div>
        )}
      </div>
      {isEdit ? (
        <div className="AccountItemOptionBtnBox">
          <div className="AccountItemQuitEditBox">
            <button className="AccountItemQuitEditBtn" onClick={handleQuitEdit}>
              수정 취소
            </button>
          </div>
          <div className="AccountItemEditSubmitBox">
            <button className="AccountItemEditSubmitBtn" onClick={handleEdit}>
              수정 완료
            </button>
          </div>
        </div>
      ) : (
        <div className="AccountItemBtnBox">
          <div className="AccountItemRemoteBox">
            <button className="AccountItemRemoteBtn" onClick={handleRemove}>
              삭제
            </button>
          </div>
          <div className="AccountItemEditBox">
            <button className="AccountItemEditBtn" onClick={toggleIsEdit}>
              수정
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
export default AccountItem;

import React, { useRef, useState } from 'react';
import Swal from 'sweetalert2';
import styled from 'styled-components';

const AccountItemBox = styled.div`
  justify-content: center;
  width: 400px;
  height: 300px;
  margin: 10px;
  border: 5px solid rgb(124, 152, 188);
`;

const AccountItemBtnBox = styled.div`
  display: flex;
  margin-left: 300px;
  text-align: center;
  bottom: 20px;
`;

const EditBtn = styled.button`
  font-family: ManfuMedium;
  font-size: 18px;
  color: rgb(210, 206, 221);
  background-color: transparent;
  border: none;
  outline: 0;
  :hover {
    transition: all 0.2s linear;
    transform: scale(1.2);
  }
`;

const InfoFirstSecondBox = styled.div`
  display: flex;
  justify-content: center;
`;

const Container = styled.div`
  text-align: center;
`;

const ContainerItem = styled.div`
  width: 400px;
  height: 300px;
  top: 0;
`;

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
  const [editSpent_person, setEditSpent_person] = useState(spent_person);
  const [editItem_name, setEditItem_name] = useState(item_name);
  const [editTarget_currency, setEditTarget_currency] =
    useState(target_currency);
  const [editCategory, setEditCategory] = useState(category);

  const editPriceInput = useRef();
  const editMemoInput = useRef();
  const editSpent_personInput = useRef();
  const editItem_nameInput = useRef();
  const editTarget_currencyInput = useRef();
  const editCategoryInput = useRef();

  const handleRemove = () => {
    Swal.fire({
      title: `기록을 삭제할까요?`,
      text: '💁‍♂️ 삭제시 기록을 복구할 수 없어요',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: '네',
      cancelButtonText: '아니오',
      backdrop: `
      rgba(0,0,110,0.5)
      url("https://velog.velcdn.com/images/do66i/post/3361f525-3743-4954-9d15-4318619713e1/image.gif")
      left bottom
      no-repeat
    `,
    }).then(result => {
      if (result.isConfirmed) {
        Swal.fire({
          icon: 'success',
          title: '삭제 완료!',
          text: `선택하신 기록을 삭제했어요`,
          confirmButtonText: '알겠어요',
        });
        onRemove(id);
      }
    });
  };

  const handleQuitEdit = () => {
    setIsEdit(false);
    setEditPrice(price);
    setEditMemo(memo);
    setEditSpent_person(spent_person);
    setEditItem_name(item_name);
    setEditTarget_currency(target_currency);
    setEditCategory(category);
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

    if (editSpent_person.length < 1) {
      editSpent_personInput.current.focus();
    }

    if (editItem_name.length < 1) {
      editItem_nameInput.current.focus();
    }

    if (editTarget_currency.length < 1) {
      editTarget_currencyInput.current.focus();
    }
    Swal.fire({
      title: `기록을 수정할까요?`,
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: '네',
      cancelButtonText: '아니오',
      backdrop: `
      rgba(0,0,110,0.5)
      url("https://velog.velcdn.com/images/do66i/post/6e2b4f91-b6b9-4441-9d47-42e53cf65482/image.gif")
      right bottom
      no-repeat
    `,
    }).then(result => {
      if (result.isConfirmed) {
        Swal.fire({
          icon: 'success',
          title: '수정 완료!',
          text: `선택하신 기록을 수정했어요`,
          confirmButtonText: '알겠어요',
        });
        onEdit(
          id,
          editPrice,
          editMemo,
          editSpent_person,
          editItem_name,
          editTarget_currency,
          editCategory,
        );
        toggleIsEdit();
      } else if (result.isDismissed) {
        Swal.fire({
          icon: 'info',
          text: `수정을 취소했어요`,
          confirmButtonText: '알겠어요',
        });
        handleQuitEdit();
      }
    });
  };

  return (
    <Container>
      <AccountItemBox>
        <div>
          {isEdit ? (
            <>
              <div className="AccountItemInputBox" style={{ size: '10px' }}>
                뭐샀누 ?
                <input
                  placeholder="무엇을 구입했나요 ?"
                  className="AccountItemInput"
                  ref={editItem_nameInput}
                  value={editItem_name}
                  onChange={e => setEditItem_name(e.target.value)}
                />
              </div>
              <div className="AccountItemInputBox">
                통화 ?
                <input
                  placeholder="어느나라돈을 사용했나요 ?"
                  className="AccountItemInput"
                  ref={editTarget_currencyInput}
                  value={editTarget_currency}
                  onChange={e => setEditTarget_currency(e.target.value)}
                />
              </div>
              <div className="AccountItemInputBox">
                돈 쓴 사람 ?
                <input
                  placeholder="돈 쓴 사람을 입력해요"
                  className="AccountItemInput"
                  ref={editSpent_personInput}
                  value={editSpent_person}
                  onChange={e => setEditSpent_person(e.target.value)}
                />
              </div>
              멤모 ?
              <div className="AccountItemInputBox">
                <input
                  placeholder="메모를 입력해요"
                  className="AccountItemInput"
                  ref={editMemoInput}
                  value={editMemo}
                  onChange={e => setEditMemo(e.target.value)}
                />
              </div>
              얼마씀 ?
              <div className="AccountItemInputBox">
                <input
                  placeholder="사용금액을 입력해요"
                  className="AccountItemInput"
                  ref={editPriceInput}
                  value={editPrice}
                  onChange={e => setEditPrice(e.target.value)}
                />
              </div>
              <span className="selectSpan">
                <select
                  className="select"
                  name="category"
                  ref={editCategoryInput}
                  value={editCategory}
                  // value={state.category}
                  onChange={e => setEditCategory(e.target.value)}
                >
                  <option value={'식비'}>식비</option>
                  <option value={'교통비'}>교통비</option>
                  <option value={'숙박비'}>숙박비</option>
                  <option value={'티켓'}>티켓</option>
                  <option value={'기념품'}>기념품</option>
                  <option value={'기타항목'}>기타항목</option>
                </select>
              </span>
            </>
          ) : (
            <>
              <InfoFirstSecondBox>
                <ContainerItem>
                  <div style={{ height: '300px' }}>
                    <div
                      className=" AccountCategoryBox"
                      style={{
                        marginTop: '30px',
                        display: 'flex',
                        justifyContent: 'space-between',
                        fontSize: '1em',
                      }}
                    >
                      <div
                        style={{
                          fontSize: '1.2em',
                          marginLeft: '40px',
                        }}
                      >
                        {category}
                      </div>
                      <div
                        className="AccountItemContentBoxText2"
                        style={{ fontSize: '0.7em', marginRight: '20px' }}
                      >
                        <div className="date">
                          {String(write_date).slice(0, 16)}
                        </div>
                        <div>{spent_person}</div>
                      </div>
                    </div>

                    <div
                      className="AccountItemContentBox"
                      style={{
                        fontSize: '30px',
                        display: 'flex',
                        justifyContent: 'space-around',
                        alignItems: 'center',
                      }}
                    >
                      <div className="AccountItemContentBoxText1">
                        <p style={{ fontSize: '1em' }}>{item_name}</p>
                      </div>
                      <div className="AccountItemContentBoxText2">
                        <p style={{ fontWeight: 'bold', fontSize: '1.2em' }}>
                          {price}
                        </p>
                      </div>
                      <div className="AccountItemContentBoxText2">
                        <p style={{ fontSize: '0.5em' }}>{target_currency}</p>
                      </div>
                    </div>
                    <div className="AccountItemContentBoxText2">
                      <p>{memo}</p>
                    </div>
                    <AccountItemBtnBox>
                      <div className="AccountItemRemoteBox">
                        <EditBtn
                          className="AccountItemRemoteBtn"
                          onClick={handleRemove}
                        >
                          삭제
                        </EditBtn>
                      </div>
                      <div className="AccountItemEditBox">
                        <EditBtn
                          className="AccountItemEditBtn"
                          onClick={toggleIsEdit}
                        >
                          수정
                        </EditBtn>
                      </div>
                    </AccountItemBtnBox>
                  </div>
                </ContainerItem>
              </InfoFirstSecondBox>
            </>
          )}
        </div>
        {isEdit ? (
          <div className="AccountItemOptionBtnBox">
            <div className="AccountItemQuitEditBox">
              <EditBtn
                className="AccountItemQuitEditBtn"
                onClick={handleQuitEdit}
              >
                수정 취소
              </EditBtn>
            </div>
            <div className="AccountItemEditSubmitBox">
              <EditBtn
                className="AccountItemEditSubmitBtn"
                onClick={handleEdit}
              >
                수정 완료
              </EditBtn>
            </div>
          </div>
        ) : (
          ''
        )}
      </AccountItemBox>
    </Container>
  );
}
export default AccountItem;

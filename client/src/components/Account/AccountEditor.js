import React, { useRef, useState, useEffect } from 'react';
import Swal from 'sweetalert2';
import styled, { keyframes } from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faMoneyBills,
  faMapLocationDot,
} from '@fortawesome/free-solid-svg-icons';
import AOS from 'aos';
import 'aos/dist/aos.css';
import Map from './Map';
import Modal1 from '../common/Modal';
import MyVerticallyCenteredModal from './MyVerticallyCenteredModal';
import parrot12 from '../../Assets/parrot12.gif';
import catzzal4 from '../../Assets/catzzal4.gif';
import parrot11 from '../../Assets/parrot11.gif';
import parrot10 from '../../Assets/parrot10.gif';
import dogeparrot from '../../Assets/dogeparrot.gif';

const faMoneyBillsIcon = (
  <FontAwesomeIcon
    icon={faMoneyBills}
    style={{ width: '30px', height: '30px' }}
  />
);

const mapIcont = (
  <FontAwesomeIcon
    icon={faMapLocationDot}
    style={{ width: '30px', height: '30px' }}
  />
);

const AccountEditBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 15px 0;
  height: 245px;
  margin-bottom: 25px;
  font-size: 1em;
`;

const AccountEditInputBox = styled.input`
  text-align: center;
  font-family: SsurroundFont;
  background-color: transparent;
  outline: none;
  border: none;
  font-size: 1.05em;
  :hover {
    z-index: 1;
    transition: all 0.2s linear;
    transform: scale(1.2);
  }
  :focus {
    transition: all 0.4s ease-in;
    border-bottom: 2px solid pink;
  }
`;

const AccountItemInputBox = styled.div`
  display: flex;
  justify-content: space-around;
`;

const Swing = keyframes`
    	0%{
        	transform: rotate(0deg);
        }
        10%{
        	transform: rotate(10deg);
        }
        20%{
        	transform: rotate(-10deg);
        }
        30%{
        	transform: rotate(5deg);
        }
        40%{
        	transform: rotate(-5deg);
        }
        50%{
        	transform: rotate(2deg);
        }
        60%{
        	transform: rotate(-2deg);
        }
        70%{
        	transform: rotate(0deg);
        }
        100%{
        	transform: rotate(0deg);
        }
`;

const Jump = keyframes`
	0% {margin-top: 0px;}
	100% {margin-top: 5px;}
`;

const AccountEditTextBox = styled.input`
  text-align: center;
  border: none;
  font-family: SsurroundFont;
  width: 300px;
  height: 70px;
  resize: none;
  outline: none;
  :hover {
    transition: all 0.2s linear;
    transform: scale(1.05);
  }
  :focus {
    transition: all 0.4s ease-in;
    border-bottom: 2px solid pink;
  }
`;

//!--------------------- Map Btn

const fadeInUp = keyframes`
  0% {
      opacity: 0;
  }
  to {
      opacity: 1;
      transform: translateZ(0);
  }
  `;

const Mapbtn = styled.button`
  visibility: hidden;
  border: none;
  background-color: transparent;
  position: fixed;
`;

//!------------------------------ AccountBox that show on the screen
const AccountItemBox = styled.div`
  width: 400px;
  height: 300px;
  margin: 10px;
  border-radius: 20px;
  border: 3px solid rgb(124, 152, 188);
  :hover {
    transition: all 0.2s linear;
    transform: scale(1.05);
    box-shadow: 0px 5px 10px 5px rgba(130, 141, 171, 0.3);
  }
  &:hover ${Mapbtn} {
    visibility: visible;
    animation: ${fadeInUp} 2s;
    transition: all 0.3s;
  }
  :hover div.moneyBox {
    transition: all 2s ease-in-out;
    animation: ${Jump} 0.3s linear 0s infinite alternate;
    margin-top: 0;
    color: #473888;
  }
  :hover div.AccountItemContentBoxText2 {
    transform-origin: 50% 0;
    animation: ${Swing};
    animation-duration: 2s;
    animation-iteration-count: infinite;
    animation-delay: 0.5s;
  }
  :hover div.categoryBox {
    transition: all 1s ease;
    color: rgb(183, 139, 186);
  }
`;

//!--------------------- Map Btn

const AccountMemoBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  border: none;
  width: 380px;
  height: 80px;
  font-size: 0.8em;
  :hover {
    transition: all 0.2s linear;
    transform: scale(1.05);
    border-top: 1px solid rgb(211, 226, 244);
    border-left: none;
    border-right: none;
    border-bottom: 1px solid rgb(211, 226, 244);
  }
`;

const AccountItemSecondBox = styled.div`
  display: flex;
  justify-content: space-between;
  text-align: center;
  align-items: center;
  padding: 10px 0;
  height: 80px;
  font-size: 1em;
`;

const AccountItemBtnBox = styled.div`
  display: flex;
  justify-content: space-between;
  text-align: center;
  margin: 15px;
  bottom: 20px;
`;

const EditBtn = styled.button`
  font-family: ManfuMedium;
  font-size: 15px;
  color: rgb(210, 206, 221);
  background-color: transparent;
  border: none;
  outline: 0;
  :hover {
    transition: all 0.2s linear;
    transform: scale(1.2);
  }
`;

const AccountItemOptionBtnBox = styled.div`
  display: flex;
  justify-content: center;
  margin-left: 230px;
`;

const InfoFirstSecondBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const Container = styled.div`
  text-align: center;
`;

const ContainerItem = styled.div`
  width: 400px;
  height: 300px;
  top: 0;
`;

function AccountEditor({
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
  gps,
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

  const [modalShow, setModalShow] = React.useState(false);

  const editPriceInput = useRef();
  const editMemoInput = useRef();
  const editSpent_personInput = useRef();
  const editItem_nameInput = useRef();
  const editTarget_currencyInput = useRef();
  const editCategoryInput = useRef();

  useEffect(() => {
    AOS.init();
    AOS.refresh();
  }, []);

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
      url(${parrot12})
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
          backdrop: `
          rgba(0,0,110,0.5)
          url(${dogeparrot})
          right top
          no-repeat
        `,
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
      url(${catzzal4})
      left top
      no-repeat
    `,
    }).then(result => {
      if (result.isConfirmed) {
        Swal.fire({
          icon: 'success',
          title: '수정 완료!',
          text: `선택하신 기록을 수정했어요`,
          confirmButtonText: '알겠어요',
          backdrop: `
          rgba(0,0,110,0.5)
          url(${parrot11})
          bottom
          no-repeat
        `,
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
          backdrop: `
          rgba(0,0,110,0.5)
          url(${parrot10})
          top
          no-repeat
        `,
        });
        handleQuitEdit();
      }
    });
  };

  return (
    <Container data-aos="fade-up">
      <AccountItemBox>
        <div>
          {isEdit ? (
            <>
              <AccountEditBox>
                <AccountItemInputBox>
                  구입한 것 :
                  <AccountEditInputBox
                    maxlength="10"
                    placeholder="무엇을 구입했나요 ?"
                    className="AccountItemInput"
                    ref={editItem_nameInput}
                    value={editItem_name}
                    onChange={e => setEditItem_name(e.target.value)}
                  />
                </AccountItemInputBox>
                <AccountItemInputBox>
                  사용한 통화 :
                  <AccountEditInputBox
                    placeholder="어느나라돈을 사용했나요 ?"
                    maxlength="3"
                    className="AccountItemInput"
                    ref={editTarget_currencyInput}
                    value={editTarget_currency}
                    onChange={e => setEditTarget_currency(e.target.value)}
                  />
                </AccountItemInputBox>
                <AccountItemInputBox>
                  구입한 사람 :
                  <AccountEditInputBox
                    maxlength="5"
                    placeholder="돈 쓴 사람을 입력해요"
                    className="AccountItemInput"
                    ref={editSpent_personInput}
                    value={editSpent_person}
                    onChange={e => setEditSpent_person(e.target.value)}
                  />
                </AccountItemInputBox>
                <div>
                  <div>메모</div>
                  <AccountEditTextBox
                    maxlength="50"
                    placeholder="메모를 입력해요"
                    className="AccountItemInput"
                    ref={editMemoInput}
                    value={editMemo}
                    onChange={e => setEditMemo(e.target.value)}
                  />
                </div>
                <div>
                  사용금액 :
                  <AccountEditInputBox
                    maxlength="10"
                    placeholder="사용금액을 입력해요"
                    className="AccountItemInput"
                    ref={editPriceInput}
                    value={editPrice}
                    onChange={e => setEditPrice(e.target.value)}
                  />
                  <span className="selectSpan" style={{ paddingLeft: '20px' }}>
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
                      <option value={'기타'}>기타</option>
                    </select>
                  </span>
                </div>
              </AccountEditBox>
            </>
          ) : (
            <>
              <InfoFirstSecondBox>
                <ContainerItem>
                  <div
                    style={{
                      display: 'flex',
                      height: '300px',
                      flexDirection: 'column',
                      justifyContent: 'space-between',
                    }}
                  >
                    <div
                      style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                      }}
                    >
                      <div
                        className="categoryBox"
                        style={{
                          fontFamily: 'SBFontLight',
                          fontSize: '1.8em',
                          marginLeft: '25px',
                          marginTop: '10px',
                        }}
                      >
                        {category}
                      </div>
                      <div className="moneyBox" style={{ paddingLeft: '70px' }}>
                        {faMoneyBillsIcon}
                      </div>
                      <div
                        className="AccountItemContentBoxText0"
                        style={{
                          fontSize: '0.9em',
                          width: '150px',
                          height: '50px',
                          marginRight: '15px',
                          marginTop: '10px',
                        }}
                      >
                        <div className="date">
                          {String(write_date).slice(0, 16)}
                        </div>
                        <div>{spent_person}</div>
                      </div>
                    </div>
                    <AccountItemSecondBox>
                      <div
                        className="AccountItemContentBoxText1"
                        style={{
                          fontSize: '1em',
                          marginTop: '10px',
                          width: '90px',
                          height: '30px',
                          overflow: 'hidden',
                          textOverflow: 'ellipsis',
                        }}
                      >
                        {item_name}
                      </div>
                      <div
                        className="AccountItemContentBoxText2"
                        style={{
                          fontFamily: 'ManfuMedium',
                          fontWeight: 'bold',
                          fontSize: '2.2em',
                          width: '180px',
                          height: '35px',
                          display: 'flex',
                          justifyContent: 'center',
                          textAlign: 'center',
                          alignItems: 'center',
                          marginTop: '5px',
                        }}
                      >
                        {price}
                      </div>
                      <div
                        className="AccountItemContentBoxText3"
                        style={{
                          display: 'flex',
                          justifyContent: 'center',
                          textAlign: 'center',
                          alignItems: 'center',
                        }}
                      >
                        <p
                          style={{
                            textAlign: 'center',
                            fontSize: '1em',
                            width: '90px',
                            height: '30px',
                            overflow: 'hidden',
                            textOverflow: 'ellipsis',
                            margin: 0,
                          }}
                        >
                          {target_currency}
                        </p>
                      </div>
                    </AccountItemSecondBox>
                    <div
                      style={{
                        display: 'flex',
                        justifyContent: 'center',
                      }}
                    >
                      <AccountMemoBox>{memo}</AccountMemoBox>
                    </div>
                    <AccountItemBtnBox>
                      <div>
                        <Mapbtn
                          variant="primary"
                          onClick={() => setModalShow(true)}
                        >
                          {mapIcont}
                        </Mapbtn>
                        {console.log('git')}
                        <MyVerticallyCenteredModal
                          show={modalShow}
                          onHide={() => setModalShow(false)}
                          gps={gps}
                        />
                      </div>
                      <div className="AccountItemRemoteBox">
                        <EditBtn
                          className="AccountItemRemoteBtn"
                          onClick={handleRemove}
                        >
                          삭제
                        </EditBtn>
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
          <AccountItemOptionBtnBox>
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
          </AccountItemOptionBtnBox>
        ) : (
          ''
        )}
      </AccountItemBox>
    </Container>
  );
}
export default AccountEditor;

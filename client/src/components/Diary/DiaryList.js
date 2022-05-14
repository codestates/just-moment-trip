import React, { useState } from 'react';
import DiaryEditor from './DiaryEditor';
import DiaryWriteUp from './DiaryWriteUp';
import styled, { keyframes } from 'styled-components';
import Modal from '../common/Modal';
import Swal from 'sweetalert2';
const fuzzy = require('./fuzzy');
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faDove,
  faCircleQuestion,
  faQuestionCircle,
} from '@fortawesome/free-solid-svg-icons';
import parrot9 from '../../Assets/parrot9.gif';

const AnimationBox = keyframes`
50% {
    border-top-color: rgb(201, 199, 237);
    border-right-color: rgb(201, 199, 237);
    -webkit-transition: width 0.25s ease-out, height 0.25s ease-out 0.25s;
    transition: width 0.25s ease-out, height 0.25s ease-out 0.25s;
  }
  99% {
    border-bottom-color: rgb(201, 199, 237);
    border-left-color: rgb(201, 199, 237);
    -webkit-transition: border-color 0s ease-out 0.5s, width 0.25s ease-out 0.5s,
      height 0.25s ease-out 0.75s;
    transition: border-color 0s ease-out 0.5s, width 0.25s ease-out 0.5s,
      height 0.25s ease-out 0.75s;
  }
  100% {
    border-color: rgb(201, 199, 237);
  }
`;

let DiaryModalBtnAnimation = keyframes`
  50% {top: 0; opacity: 1}
  100% {top: -300px; opacity: 0}
  `;

const IconBtn = styled.div`
  animation-name: ${DiaryModalBtnAnimation};
  animation-duration: 0.5s;
  :hover {
    transition: all 0.2s linear;
    transform: scale(1.2);
  }
`;

const Wrapper = styled.div`
  padding: 30px 0;
  display: flex;
  font-size: 2em;

  /* :hover {
    transition: all ease 1s;
    transform: rotate(-45deg);
    border-color: #7c98bc;
  } */
`;

const Wrapper2 = styled.div`
  justify-content: center;
  align-items: center;
  text-align: center;
  padding: 30px 0;
  display: flex;
  font-size: 2em;
`;

const PBox = styled.p`
  padding: 10px;
  font-size: 50px;
  border-radius: 20px;
  border: 2px solid transparent;
  animation-name: ${AnimationBox};
  animation-fill-mode: forwards;
  animation-direction: alternate;
  animation-iteration-count: infinite;
  animation-duration: 6s;
  animation-timing-function: initial;
`;

const SearchInput = styled.input`
  border-bottom: 0.8px solid rgb(201, 199, 237);
  width: 50vw;
  height: 50px;
  align-items: center;
  text-align: center;
  font-family: SsurroundFont;
  font-size: 1em;
  background-color: transparent;
  outline: none;
  border-top: none;
  border-right: none;
  border-left: none;

  :hover {
    z-index: 1;
    transition: all 0.2s linear;
    transform: scale(1.05);
  }
  :focus {
    transition: all 0.4s ease-in;
    border-bottom: 2px solid pink;
  }
`;

const FilterBtn = styled.button`
  outline: none;
  border: none;
  background-color: transparent;
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

const HelpBtnBox = styled.button`
  outline: none;
  border: none;
  size: 50px;
  padding: 20px;
  background-color: transparent;
  font-size: 20px;
`;

const DiarySplitBox = styled.div`
  display: flex;
`;

const doveIcon = (
  <IconBtn>
    <FontAwesomeIcon icon={faDove} style={{ fontSize: '60px' }} />
  </IconBtn>
);

function DiaryList({
  onCreate,
  onEdit,
  onRemove,
  diaryList,
  changeInput,
  search,
  getSearchType,
  searchType,
}) {
  const DiaryListBox = styled.div`
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(25vw, 1fr));
    text-align: center;
  `;

  const DiaryBox = styled.div`
    display: flex;
    flex-direction: column;
    background-color: rgb(211, 226, 244);
    padding-bottom: 120px;
    align-items: center;
  `;
  const [clickedHashtag, setClickedHashtag] = useState('');
  const [clicked, setClicked] = useState(false);

  const toggleClicked = event => {
    setClicked(true);
    setClickedHashtag(event.target.innerText);
    console.log('------------- clicked?', clicked);
    console.log('------------- clickedHashtag', clickedHashtag);
  };

  function filterDiary() {
    return diaryList.filter(it => {
      let test = false;
      it.hashtags.forEach(element => {
        if (element === clickedHashtag) test = true;
      });
      return test;
    });
  }

  //!-----------------
  const helpBtnFx = () => {
    let timerInterval;
    Swal.fire({
      width: 800,
      height: 900,
      title: `🦜 를 누르면 기록을 남길 수 있어요

      제목/내용을 검색할 수 있어요 🐟

      🥔 해시태그를 누르면 무슨일이 일어날까요?`,
      html: '<b></b>초 후 자동으로 사라져요 !',
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
      /* Read more about handling dismissals below */
      if (result.dismiss === Swal.DismissReason.timer) {
        console.log('I was closed by the timer');
      }
    });
    return console.log('hi');
  };
  //!-----------

  return (
    <>
      {clicked ? (
        <>
          {console.log('공사중')}

          <DiaryListBox>
            {filterDiary().map(it => (
              <DiaryEditor
                key={it.id}
                {...it}
                diaryList={diaryList}
                onCreate={onCreate}
                onEdit={onEdit}
                onRemove={onRemove}
                toggleClicked={toggleClicked}
                search={search}
                searchType={searchType}
              />
            ))}
          </DiaryListBox>
          <FilterBtn
            onClick={() => {
              setClicked(false);
            }}
          >
            태초마을로 가기 🌱
          </FilterBtn>
        </>
      ) : (
        <>
          <DiaryBox>
            <div>
              <Modal name={doveIcon}>
                <DiaryWriteUp onCreate={onCreate} />
              </Modal>
            </div>
            <div style={{ padding: '20px 0' }}>
              <SearchInput
                type="text"
                placeholder="입력하지마라"
                onKeyPress={changeInput}
              />
              <input
                type="radio"
                name="searchType"
                value="title"
                onClick={getSearchType}
              />{' '}
              제목
              <input
                type="radio"
                name="searchType"
                value="content"
                onClick={getSearchType}
              />{' '}
              기록
            </div>
          </DiaryBox>
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <div style={{ display: 'flex' }}>
              <Wrapper>기록들</Wrapper>
            </div>
            <Wrapper2>
              <PBox>{diaryList.length}</PBox>
              <p style={{ textAlign: 'center' }}>개의 일기가 있습니다.</p>
            </Wrapper2>
          </div>
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
          <div>
            {/* <DiarySplitBox> */}
            <DiaryListBox>
              {diaryList.map(it => (
                <DiaryEditor
                  key={it.id}
                  {...it}
                  onCreate={onCreate}
                  onEdit={onEdit}
                  onRemove={onRemove}
                  toggleClicked={toggleClicked}
                  search={search}
                  searchType={searchType}
                />
              ))}
            </DiaryListBox>

            {/* </DiarySplitBox> */}
          </div>
        </>
      )}
    </>
  );
}

DiaryList.defaultProps = {
  diaryList: [],
};

export default DiaryList;

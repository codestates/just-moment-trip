import React, { useState } from 'react';
import DiaryEditor from './DiaryEditor';
import DiaryWriteUp from './DiaryWriteUp';
import styled, { keyframes } from 'styled-components';
import Modal from '../common/Modal';
import Swal from 'sweetalert2';
const fuzzy = require('./fuzzy');
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDove } from '@fortawesome/free-solid-svg-icons';

const AnimationBox = keyframes`
50% {
    border-top-color: #6bb4fe;
    border-right-color: #6bb4fe;
    -webkit-transition: width 0.25s ease-out, height 0.25s ease-out 0.25s;
    transition: width 0.25s ease-out, height 0.25s ease-out 0.25s;
  }
  99% {
    border-bottom-color: #6bb4fe;
    border-left-color: #6bb4fe;
    -webkit-transition: border-color 0s ease-out 0.5s, width 0.25s ease-out 0.5s,
      height 0.25s ease-out 0.75s;
    transition: border-color 0s ease-out 0.5s, width 0.25s ease-out 0.5s,
      height 0.25s ease-out 0.75s;
  }
  100% {
    border-color: #6bb4fe;
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

const doveIcon = (
  <IconBtn>
    <FontAwesomeIcon icon={faDove} />
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
    background-color: white;
  `;

  const DiaryBox = styled.div`
    display: flex;
    flex-direction: column;
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

  //!-----------
  const helpBtnFx = () => {
    let timerInterval;
    Swal.fire({
      width: 800,
      height: 900,
      title: `🦜 를 누르면 기록을 남길 수 있어요

      제목/내용을 검색할 수 있어요 🐟

      🥔 해시태그를 누르면 무슨일이 일어날까요?`,
      html: 'I will close in <b></b> milliseconds.',
      timer: 2000,
      timerProgressBar: true,
      backdrop: `
      rgba(0,0,110,0.5)
      url("https://velog.velcdn.com/images/do66i/post/cfcf01ce-7fde-4b6d-b0d2-3571219ef062/image.gif")
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
          <button
            onClick={() => {
              setClicked(false);
            }}
          >
            태초마을로 가기 🌱 특징 : 야매임 🌱
          </button>
        </>
      ) : (
        <>
          <DiaryBox>
            <div>
              <Modal name={doveIcon}>
                <DiaryWriteUp onCreate={onCreate} />
              </Modal>
            </div>
            <div>
              <input
                style={{ width: '50vw', height: '50px' }}
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
              title
              <input
                type="radio"
                name="searchType"
                value="content"
                onClick={getSearchType}
              />{' '}
              content
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
          <div>
            <button onClick={helpBtnFx}>버튼</button>
          </div>
          <div>
            <DiaryListBox>
              {diaryList.map(it => (
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

import React, { useState } from 'react';
import DiaryEditor from './DiaryEditor';
import DiaryWriteUp from './DiaryWriteUp';
import styled, { keyframes } from 'styled-components';
import Modal from '../common/Modal';
const fuzzy = require('./fuzzy');
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDove } from '@fortawesome/free-solid-svg-icons';

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
`;

const Wrapper2 = styled.div`
  justify-content: center;
  align-items: center;
  text-align: center;
  padding: 30px 0;
  display: flex;
  font-size: 2em;
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
              <p style={{ fontSize: '50px' }}>{diaryList.length}</p>
              <p style={{ textAlign: 'center' }}>개의 일기가 있습니다.</p>
            </Wrapper2>
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

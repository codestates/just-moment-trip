import React, { useState } from 'react';
import DiaryEditor from './DiaryEditor';
import DiaryWriteUp from './DiaryWriteUp';
import styled from 'styled-components';
import Modal from '../common/Modal';
const fuzzy = require('./fuzzy');
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
    text-align: center;
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
    <DiaryListBox>
      {clicked ? (
        <>
          {console.log('공사중')}
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
          <div>
            <Modal name={'이건 버튼'}>
              <DiaryWriteUp onCreate={onCreate} />
            </Modal>
          </div>
          <div>
            <input
              style={{ width: '70%', height: '50px' }}
              type="text"
              placeholder="입력하지마라"
              onKeyPress={changeInput}
            />
            <input
              type="radio"
              name="searchType"
              value="title"
              onClick={getSearchType}
            />
            title
            <input
              type="radio"
              name="searchType"
              value="content"
              onClick={getSearchType}
            />
            content
          </div>
          <h2>일기 리스트</h2>
          <h4>{diaryList.length}개의 일기가 있습니다.</h4>
          <div>
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
          </div>
        </>
      )}
    </DiaryListBox>
  );
}

DiaryList.defaultProps = {
  diaryList: [],
};

export default DiaryList;

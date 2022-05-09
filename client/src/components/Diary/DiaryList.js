import React, { useState } from 'react';
import DiaryEditor from './DiaryEditor';
import DiaryWriteUp from './DiaryWriteUp';
import Modal from '../common/Modal';

function DiaryList({
  onCreate,
  onEdit,
  onRemove,
  diaryList,
  hashTags,
  changeInput,
}) {
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
    <div className="DiaryList">
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
            <Modal>
              <DiaryWriteUp onCreate={onCreate} />
            </Modal>
          </div>
          <div>
            <input
              type="text"
              placeholder="입력하지마라"
              onKeyPress={changeInput}
            />
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
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
}

DiaryList.defaultProps = {
  diaryList: [],
};

export default DiaryList;

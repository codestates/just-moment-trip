import React from 'react';
import DiaryEditor from './DiaryEditor';
import DiaryWriteUp from './DiaryWriteUp';

function DiaryList({ onCreate, onEdit, onRemove, diaryList }) {
  return (
    <div className="DiaryList">
      <div>
        <DiaryWriteUp onCreate={onCreate} />
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
          />
        ))}
      </div>
    </div>
  );
}

DiaryList.defaultProps = {
  diaryList: [],
};

export default DiaryList;

import React from 'react';
import DiaryEditor from './DiaryEditor';
import DiaryWriteUp from './DiaryWriteUp';
import styled from 'styled-components';
import Modal from '../common/Modal';

function DiaryList({ onCreate, onEdit, onRemove, onFilter, diaryList }) {
  return (
    <div className="DiaryList">
      <div>
        <Modal>
          <DiaryWriteUp onCreate={onCreate} />
        </Modal>
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
            onFilter={onFilter}
          />
        ))}
      </div>
      {console.log('------------------- DiaryList의 Data ? ', diaryList)}
    </div>
  );
}

DiaryList.defaultProps = {
  diaryList: [],
};

export default DiaryList;

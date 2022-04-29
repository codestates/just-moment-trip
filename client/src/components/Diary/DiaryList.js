import React from 'react';
import DiaryEditor from './DiaryEditor';
import DiaryWriteUp from './DiaryWriteUp';
import styled from 'styled-components';
import Modal from '../common/Modal';

function DiaryList({ onCreate, onEdit, onRemove, diaryList }) {
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
          />
        ))}
        {/* 여기 손보기 삼항연산자 사용해서 태그 눌렀을때 ? 태그 관련 페이지 보이게 : 총 데이터 리스트 보이게*/}
      </div>
    </div>
  );
}

DiaryList.defaultProps = {
  diaryList: [],
};

export default DiaryList;

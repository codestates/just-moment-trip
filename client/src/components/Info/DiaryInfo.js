import React from 'react';
import styled from 'styled-components';
import DiaryEditor from '../Diary/DiaryEditor';

function DiaryInfo() {
  const dummyData = {
    onEdit: () => {
      Swal.fire('로그인후 Diary에서 체험하세요');
    },
    onRemove: () => {
      Swal.fire('로그인후 Diary에서 체험하세요');
    },
    id: 100000,
    title: '구미 디즈니랜드',
    content: '퍼레이드가 너무 재미있었다',
    write_date: '2022-07-01',
    hashtags: ['꿀잼', '허니잼', '맛집'],
    search: '',
  };
  return <DiaryEditor {...dummyData} />;
}

export default DiaryInfo;

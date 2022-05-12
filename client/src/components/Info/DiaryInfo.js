import React, { useRef } from 'react';
import DiaryEditor from '../Diary/DiaryEditor';
import Container from './Container';

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

  return (
    <Container direction={'row'} back={' rgba(0, 255, 0, .4)'}>
      <div className="message">즐거웠던 하루의 일들에 대해 일기도 작성하고</div>
      <span>
        <DiaryEditor {...dummyData} />
      </span>
    </Container>
  );
}

export default DiaryInfo;

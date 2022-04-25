import React from 'react';
import DiaryList from '../components/Diary/DiaryList';
import DiaryStore from '../components/Diary/DiaryStore';

function Diary() {
  return (
    <div>
      니하오!
      <DiaryStore>
        <DiaryList />
      </DiaryStore>
    </div>
  );
}

export default Diary;

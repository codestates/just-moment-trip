import React from 'react';
import { memo, useEffect, useRef, useState } from 'react';

function DiaryEditor({
  onRemove,
  onEdit,
  id,
  location,
  content,
  writeDate,
  hashtags,
}) {
  useEffect(() => {
    console.log(`${id}번 일기아이템 렌더`);
  });

  const localContentInput = useRef();
  const localLocationInput = useRef();
  const [localContent, setLocalContent] = useState(content);
  const [localLocation, setLocalLocation] = useState(location);
  const [isEdit, setIsEdit] = useState(false);
  const toggleIsEdit = () => setIsEdit(!isEdit);

  const handleClickRemove = () => {
    if (window.confirm(`${id}번째 일기를 정말 삭제하시겠습니까?`)) {
      onRemove(id);
      console.log('check ID :', id);
    }
  };

  const handleQuitEdit = () => {
    setIsEdit(false);
    setLocalLocation(location);
    setLocalContent(content);
  };

  const handleEdit = () => {
    if (localLocation.length < 1) {
      localContentInput.current.focus();
      return;
    }

    if (localContent.length < 1) {
      localContentInput.current.focus();
      return;
    }

    if (window.confirm(`${id}번 째 일기를 수정하시겠습니까?`)) {
      onEdit(id, localContent, localLocation);
      toggleIsEdit();
    }
  };

  return (
    <div className="DiaryEditor">
      <div className="info">
        {isEdit ? (
          <>
            <div className="location_edit">
              <input
                className="location_info"
                ref={localLocationInput}
                value={localLocation}
                onChange={e => setLocalLocation(e.target.value)}
              />
            </div>
            <div className="content_edit">
              <textarea
                ref={localContentInput}
                value={localContent}
                onChange={e => setLocalContent(e.target.value)}
              />
            </div>
          </>
        ) : (
          <>
            <div className="location">{location}</div>
            <div className="content">{content}</div>
            <div className="hashtags">{hashtags}</div>
          </>
        )}

        <br />
        <span className="date">작성 시간 :{writeDate}</span>
      </div>

      {isEdit ? (
        <>
          <button onClick={handleQuitEdit}>수정 취소</button>
          <button onClick={handleEdit}>수정 완료</button>
        </>
      ) : (
        <>
          <button onClick={handleClickRemove}>삭제하기</button>
          <button onClick={toggleIsEdit}>수정하기</button>
        </>
      )}
    </div>
  );
}
export default memo(DiaryEditor);

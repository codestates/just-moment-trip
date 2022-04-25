import React, { useRef, useState } from 'react';

function DiaryWriteUp({ onCreate }) {
  const locationInput = useRef();
  const contentInput = useRef();
  const [state, setState] = useState({
    location: '',
    content: '',
    write_date: 1,
  });

  const handleChangeState = e => {
    console.log('타겟이름: ', e.target.name);
    console.log('타겟벨류: ', e.target.value);
    setState({ ...state, [e.target.name]: e.target.value });
  };

  const handleSubmit = e => {
    if (state.location.length < 1) {
      locationInput.current.focus();
      return;
    }

    if (state.content.length < 5) {
      contentInput.current.focus();
      return;
    }
    onCreate(state.location, state.content, state.write_date);
    console.log('일기작성여부확인 :', state);
    alert('저장성공!');
    setState({
      location: '',
      content: '',
      write_date: 1,
    });
  };

  return (
    <div className="DiaryEditor">
      <div className="DiaryEditorH2Box">
        <h2>오늘의 일기</h2>
      </div>
      <div className="DiaryEditorBox">
        <div className="DiaryEditorInputBox">
          <input
            className="DiaryEditorInput"
            placeholder="다녀온 장소를 적어요"
            ref={locationInput}
            value={state.location}
            name="location"
            onChange={handleChangeState}
          />
        </div>
        <div>
          <textarea
            className="DiaryEditorTextarea"
            placeholder="일기를 적어요"
            ref={contentInput}
            value={state.content}
            name="content"
            onChange={handleChangeState}
          />
        </div>
      </div>

      <button className="DiaryWriteUpBtn" onClick={handleSubmit}>
        ✏️
      </button>
    </div>
  );
}

export default DiaryWriteUp;

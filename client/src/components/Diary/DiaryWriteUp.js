import React, { useRef, useState } from 'react';
import styled from 'styled-components';

const TagsInput = styled.div`
  /* margin: 8rem auto; */
  display: flex;
  align-items: flex-start;
  flex-wrap: wrap;
  min-height: 48px;
  width: 480px;
  padding: 0 8px;
  border: 10px solid rgb(214, 216, 218);
  border-radius: 6px;

  > ul {
    display: flex;
    flex-wrap: wrap;
    padding: 0;
    margin: 8px 0 0 0;

    > .tag {
      width: auto;
      height: 32px;
      display: flex;
      align-items: center;
      justify-content: center;
      color: #efefef;
      padding: 0 8px;
      font-size: 14px;
      list-style: none;
      border-radius: 6px;
      margin: 0 8px 8px 0;
      background: green;
      :hover {
        transition: all 0.2s linear;
        transform: scale(1.05);
      }
      > .tag-close-icon {
        display: block;
        width: 16px;
        height: 16px;
        line-height: 16px;
        text-align: center;
        font-size: 14px;
        margin-left: 8px;
        color: red;
        border-radius: 50%;
        background: #efefef;
        cursor: pointer;
      }
    }
  }

  > input {
    flex: 1;
    border: none;
    height: 46px;
    font-size: 14px;
    padding: 4px 0 0 0;
    :focus {
      outline: transparent;
    }
  }

  &:focus-within {
    border: 5px solid palegreen;
  }
`;

function DiaryWriteUp({ onCreate, openModalHandler }) {
  const initialTags = ['연습용데이터', '도토도토도토잠보'];
  const [tags, setTags] = useState(initialTags);
  const removeTags = indexToRemove => {
    setTags(tags.filter((_, index) => index !== indexToRemove));
  };

  const addTags = event => {
    const filtered = tags.filter(el => el === event.target.value);
    if (event.target.value !== '' && filtered.length === 0) {
      setTags([...tags, event.target.value]);
      // selectedTags([...tags, event.target.value]);
      event.target.value = '';
      console.log('addTag의 tags :', tags);
      // console.log('addTag의 addTags :', addTags);
      console.log('addTag의 filtered :', filtered);
    }
  };
  const titleInput = useRef();
  const contentInput = useRef();
  let newDate = new Date();
  let nowTime =
    newDate.getFullYear() +
    '-' +
    newDate.getMonth() +
    '-' +
    newDate.getDate() +
    ' ' +
    newDate.getHours() +
    ':' +
    newDate.getMinutes() +
    ':' +
    newDate.getSeconds();
  const [state, setState] = useState({
    title: '',
    content: '',
    writeDate: nowTime,
  });

  const handleChangeState = e => {
    // console.log('타겟이름: ', e.target.name);
    // console.log('타겟벨류: ', e.target.value);
    setState({ ...state, [e.target.name]: e.target.value });
  };

  const handleSubmit = e => {
    if (state.title.length < 1) {
      titleInput.current.focus();
      return;
    }

    if (state.content.length < 1) {
      contentInput.current.focus();
      return;
    }
    onCreate(state.title, state.content, state.writeDate, tags);
    console.log('일기작성여부확인 :', state);
    console.log('handleSubmit시 tags :', tags);
    alert('저장성공!');
    setState({
      title: '',
      content: '',
      writeDate: nowTime,
    });

    openModalHandler(false);
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
            ref={titleInput}
            value={state.title}
            name="title"
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
        <div>
          <TagsInput>
            <ul id="tags">
              {tags.map((tag, index) => (
                <li key={index} className="tag">
                  <span className="tag-title">{tag}</span>
                  <span
                    className="tag-close-icon"
                    onClick={() => removeTags(index)}
                  >
                    &times;
                  </span>
                </li>
              ))}
            </ul>
            <input
              className="tag-input"
              type="text"
              onKeyUp={event => (event.key === 'Enter' ? addTags(event) : null)}
              placeholder="입력할테면해보시지"
            />
          </TagsInput>
        </div>
      </div>
      <div>
        <button className="DiaryWriteUpBtn" onClick={handleSubmit}>
          ✏️
        </button>
      </div>
    </div>
  );
}

export default DiaryWriteUp;

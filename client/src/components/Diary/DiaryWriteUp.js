import React, { useRef, useState } from 'react';
import styled, { keyframes } from 'styled-components';
import Swal from 'sweetalert2';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFeatherPointed } from '@fortawesome/free-solid-svg-icons';
import partyblobcat from '../../Assets/partyblobcat.gif';
import partymoogle from '../../Assets/partymoogle.gif';

const FeatherPointedIcon = (
  <FontAwesomeIcon
    icon={faFeatherPointed}
    style={{ width: '5vw', height: '5vh' }}
  />
);

const Shake = keyframes`
  0%,
  80% {
    transform: rotate(0deg);
  }
  5%,
  15%,
  25%,
  35%,
  45% {
    transform: rotate(4deg);
  }
  10%,
  40%,
  30%,
  40% {
    transform: rotate(-2deg);}
`;

const DiaryWriteBtn = styled.button`
  outline: none;
  background-color: transparent;
  border: none;
  padding: 0 2vh;

  :hover {
    animation: ${Shake} 4s infinite;
  }
`;

const TagsInput = styled.div`
  /* margin: 8rem auto; */
  display: ${props => props.display};
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
  height: 10vh;
  width: 98%;
  border: none;
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
      text-align: center;
      justify-content: center;
      color: #efefef;
      padding: 0 8px;
      font-size: 0.8em;
      list-style: none;
      border-radius: 6px;
      margin: 2px 2px;
      background: rgb(70, 125, 196);
      :hover {
        cursor: pointer;
        transition: all 0.5s linear;
        transform: scale(1.1);
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
    border-radius: none;
    text-align: center;
    background-color: transparent;
    border: none;
    padding: 5vh 0;
    /* width: 20vw; */
    font-size: 0.8em;
    :focus {
      outline: transparent;
    }
  }
`;

const DiaryEditorBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 10vh 0;
  height: 60vh;
`;

const DiaryBox = styled.div`
  color: rgb(89, 72, 135);
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: auto;
`;

const DiaryWriteInputBox = styled.input`
  text-align: center;
  font-family: SsurroundFont;
  background-color: transparent;
  width: 30vw;
  outline: none;
  border-top: none;
  border-right: none;
  border-left: none;
  border-bottom: 1px solid gray;
  font-size: 1.05em;
  :hover {
    border-bottom: 2px solid pink;
    transition: all 0.2s linear;
    transform: scale(1.05);
  }
  :focus {
    transition: all 0.4s ease-in;
    border: 1px solid pink;
  }
`;

const DiaryWriteTextareaBox = styled.textarea`
  text-align: center;
  font-family: SsurroundFont;
  background-color: transparent;
  outline: none;
  padding: 10px;
  width: 400px;
  resize: none;
  font-size: 10px;
  border-top: none;
  border-right: none;
  border-left: none;
  border-bottom: 1px solid gray;
  :hover {
    border-bottom: 2px solid pink;
    transition: all 0.2s linear;
    transform: scale(1.05);
  }
  :focus {
    transition: all 0.4s ease-in;
    border: 1px solid pink;
  }
`;

function DiaryWriteUp({ onCreate, openModalHandler }) {
  const initialTags = [];
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
  const [state, setState] = useState({
    title: '',
    content: '',
    write_date: '',
  });
  const handleChangeState = e => {
    // console.log('타겟이름: ', e.target.name);
    // console.log('타겟벨류: ', e.target.value);
    setState({ ...state, [e.target.name]: e.target.value });
  };

  const handleSubmit = e => {
    let newDate = new Date();
    let year = newDate.getFullYear();
    let month = newDate.getMonth();
    let date = newDate.getDate();
    let hour = newDate.getHours();
    let minute = newDate.getMinutes();
    let second = newDate.getSeconds();
    let resultDate = `${year}-${String(month + 1).padStart(2, '0')}-${String(
      date,
    ).padStart(2, '0')} ${String(hour).padStart(2, '0')}:${String(
      minute,
    ).padStart(2, '0')}:${String(second).padStart(2, '0')} GMT+0900`;

    if (state.title.length < 1) {
      titleInput.current.focus();
      return;
    }

    if (state.content.length < 1) {
      contentInput.current.focus();
      return;
    }

    Swal.fire({
      title: `기록을 저장할까요 ?`,
      icon: 'question',
      background: '#fff ',
      backdrop: `
      rgba(0,0,110,0.5)
      url(${partyblobcat})
      left top
      no-repeat
    `,
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: '네',
      cancelButtonText: '아니오',
    }).then(result => {
      if (result.isConfirmed) {
        Swal.fire({
          icon: 'success',
          title: '저장 완료!',
          text: `작성하신 기록을 저장했어요`,
          confirmButtonText: '알겠어요',
          backdrop: `
          rgba(0,0,110,0.5)
          url(${partymoogle})
          left top
          no-repeat
        `,
        });
        onCreate(
          state.title,
          state.content,
          (state.write_date = resultDate),
          tags,
        );

        setState({
          title: '',
          content: '',
          write_date: '',
        });
        openModalHandler(false);
      }
    });
  };

  return (
    <DiaryBox>
      <div className="DiaryEditorH2Box" style={{ paddingTop: '2vh' }}>
        <h2>오늘의 일기</h2>
      </div>
      <DiaryEditorBox>
        <div className="DiaryEditorInputBox" style={{ padding: '5vh 0' }}>
          <DiaryWriteInputBox
            className="DiaryEditorInput"
            placeholder="제목을 적어요"
            maxLength="20"
            ref={titleInput}
            value={state.title}
            name="title"
            onChange={handleChangeState}
          />
        </div>
        <div>
          <DiaryWriteTextareaBox
            style={{
              fontFamily: 'SsurroundFont',
              height: '150px',
              width: '450px',
              fontSize: '20px',
            }}
            className="DiaryEditorTextarea"
            placeholder="오늘은 어땠나요 ?"
            maxlength="100"
            ref={contentInput}
            value={state.content}
            name="content"
            onChange={handleChangeState}
          />
        </div>
        <div style={{ display: 'block', justifyContent: 'center' }}>
          <TagsInput>
            <ul
              id="tags"
              style={{ justifyContent: 'center', textAlign: 'center' }}
            >
              {tags.map((tag, index) => (
                <li
                  style={{ justifyContent: 'center', textAlign: 'center' }}
                  key={index}
                  className="tag"
                >
                  <span className="tag-title">{tag}</span>
                  <span
                    className="tag-close-icon"
                    style={{
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center',
                      textAlign: 'center',
                    }}
                    onClick={() => removeTags(index)}
                  >
                    &times;
                  </span>
                </li>
              ))}
            </ul>
            <input
              style={{ width: '50vw', marginBottom: '10vh' }}
              className="tag-input"
              type="text"
              onKeyUp={event => (event.key === 'Enter' ? addTags(event) : null)}
              maxlength="12"
              placeholder="최대 12자를 입력 할 수 있어요 🪐최대 12자를 입력 할 수 있어요 🪐"
            />
          </TagsInput>
        </div>
      </DiaryEditorBox>
      <div style={{ width: 'auto', marginBottom: 'auto' }}>
        <DiaryWriteBtn onClick={handleSubmit}>
          {FeatherPointedIcon}
        </DiaryWriteBtn>
      </div>
    </DiaryBox>
  );
}

export default DiaryWriteUp;

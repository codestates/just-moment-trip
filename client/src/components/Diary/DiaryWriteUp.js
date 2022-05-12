import React, { useRef, useState } from 'react';
import styled from 'styled-components';
import Swal from 'sweetalert2';

const HrEdit = styled.hr`
  border: 1px solid gray;
  width: 60%;
`;

const TagsInput = styled.div`
  /* margin: 8rem auto; */
  display: ${props => props.display};
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
  min-height: 48px;
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
    height: 5vw;
    width: 20vw;
    font-size: 0.8em;
    padding: 4px 0 0 0;
    :focus {
      outline: transparent;
    }
  }

  &:focus-within + ${HrEdit} {
    transition: all 0.4s ease-in;
    border-color: rgb(67, 45, 127);
  }
`;

const DiaryEditorBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 15px;
`;

const DiaryBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 15px;
`;

const DiaryWriteInputBox = styled.input`
  text-align: center;
  font-family: SsurroundFont;
  background-color: transparent;
  width: 32vw;
  outline: none;
  border-top: none;
  border-right: none;
  border-left: none;
  border-bottom: 1px solid gray;
  font-size: 1.05em;
  :hover {
    transition: all 0.2s linear;
    transform: scale(1.05);
  }
  :focus {
    transition: all 0.4s ease-in;
    border-bottom: 1px solid pink;
  }
`;

const DiaryWriteTextareaBox = styled.textarea`
  text-align: center;
  font-family: SsurroundFont;
  background-color: transparent;
  outline: none;
  padding-top: 15px;
  height: 80px;
  width: 40vw;
  resize: none;
  font-size: 0.8em;
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
      url("https://velog.velcdn.com/images/do66i/post/c0eac2d9-7c86-4dfa-9583-e526e4746dce/image.gif")
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
        });
        onCreate(
          state.title,
          state.content,
          (state.write_date = new Date().getTime()),
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
      <div className="DiaryEditorH2Box">
        <h2>오늘의 일기</h2>
      </div>
      <DiaryEditorBox>
        <div className="DiaryEditorInputBox" style={{ padding: '0 0 20px 0' }}>
          <DiaryWriteInputBox
            className="DiaryEditorInput"
            placeholder="제목을 적어요"
            maxlength="20"
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
        <div>
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
              maxlength="12"
              placeholder="최대 12자를 입력 할 수 있어요 🪐"
            />
          </TagsInput>
          <HrEdit />
        </div>
      </DiaryEditorBox>
      <div>
        <button className="DiaryWriteUpBtn" onClick={handleSubmit}>
          ✏️
        </button>
      </div>
    </DiaryBox>
  );
}

export default DiaryWriteUp;

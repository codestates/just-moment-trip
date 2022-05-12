import React from 'react';
import { memo, useEffect, useRef, useState } from 'react';
import styled, { keyframes } from 'styled-components';
import Swal from 'sweetalert2';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFishFins } from '@fortawesome/free-solid-svg-icons';
const fuzzy = require('./fuzzy');

const Slide = keyframes`
  0% {    
    transform: scaleX(-1);
    left: calc(30px);
  }
  49.99% {
    transform: scaleX(-1);
    left: 0%;
  }
  50% {
    transform: scaleX(1);
    left: 0%;
  }
  99.99% {
    transform: scaleX(1);
    left: calc(30px);
  }
  100% {
    transform: scaleX(-1);
    left: calc(30px);
  }
`;

const ManFishIcon = styled.div`
  width: 26.2vw;
  position: relative;
  animation-name: ${Slide};
  animation-duration: 6s;
  animation-iteration-count: infinite;
`;

const ManFishArea = styled.div`
  width: 100%;
  height: 30px;
`;

const faFishFinsIcon = (
  <ManFishArea>
    <ManFishIcon>
      <FontAwesomeIcon icon={faFishFins} />
    </ManFishIcon>
  </ManFishArea>
);

const TagsInput = styled.div`
  /* margin: 8rem auto; */
  display: ${props => props.display};
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
  min-height: 48px;
  width: 90%;
  padding: 0 8px;
  border: 10px solid rgb(93, 176, 198);
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

const DiaryEditorBox = styled.div`
  width: 28.5vw;
  height: 300px;
  margin: 10px;
  border-radius: 20px;
  border: 3px solid rgb(124, 152, 188);
  :hover {
    transition: all 0.2s linear;
    transform: scale(1.05);
  }
`;

const DiaryBtn = styled.button`
  background-color: none;
  border: none;
  font-size: 20px;
`;

function DiaryEditor({
  diaryList,
  onRemove,
  onEdit,
  toggleClicked,
  id,
  title,
  content,
  write_date,
  hashtags,
  search,
}) {
  const titleInput = useRef();
  useEffect(() => {
    console.log(`${id}번 일기아이템 렌더`);
    titleInput.current.innerHTML = titleInput.current.innerHTML
      .replace(/<span style="color: red">/g, '')
      .replace(/<\/span>/g, '');
    titleInput.current.innerHTML = fuzzy.chageRed(
      titleInput.current.innerHTML,
      search,
    );
  }, [search]);

  const localContentInput = useRef();
  const lacalTitleInput = useRef();
  const [localContent, setLocalContent] = useState(content);
  const [localTitle, setLocalTitle] = useState(title);
  const [localHashtags, setLocalHashtags] = useState(hashtags);
  const [isEdit, setIsEdit] = useState(false);
  const toggleIsEdit = () => setIsEdit(!isEdit);
  const handleClickRemove = () => {
    Swal.fire({
      title: `기록을 삭제할까요?`,
      text: '💁‍♂️ 삭제시 기록을 복구할 수 없어요',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: '네',
      cancelButtonText: '아니오',
      backdrop: `
      rgba(0,0,110,0.5)
      url("https://velog.velcdn.com/images/do66i/post/720ac6c1-4a12-4010-873c-4f54464ff586/image.gif")
      left bottom
      no-repeat
    `,
    }).then(result => {
      if (result.isConfirmed) {
        Swal.fire({
          icon: 'success',
          title: '삭제 완료!',
          text: `선택하신 기록을 삭제했어요`,
          confirmButtonText: '알겠어요',
        });

        onRemove(id);
      }
    });
  };

  const handleQuitEdit = () => {
    setIsEdit(false);
    setLocalTitle(title);
    setLocalContent(content);
    setLocalHashtags(hashtags);
  };

  const handleEdit = () => {
    if (localTitle.length < 1) {
      localContentInput.current.focus();
      return;
    }

    if (localContent.length < 1) {
      localContentInput.current.focus();
      return;
    }

    Swal.fire({
      title: `기록을 수정할까요?`,
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: '네',
      cancelButtonText: '아니오',
      backdrop: `
      rgba(0,0,110,0.5)
      url("https://velog.velcdn.com/images/do66i/post/da278e0b-6a49-407e-8517-4b4e3621de27/image.gif")
      right bottom
      no-repeat
    `,
    }).then(result => {
      if (result.isConfirmed) {
        Swal.fire({
          icon: 'success',
          title: '수정 완료!',
          text: `선택하신 기록을 수정했어요`,
          confirmButtonText: '알겠어요',
        });
        onEdit(id, localContent, localTitle, localHashtags);
        toggleIsEdit();
        console.log(
          '------------- 수정시 localHashtags는 어떻게 되나요 ? :',
          localHashtags,
        );
        console.log('------------- 수정시 id는 어떻게 되나요 ? :', hashtags);
      } else if (result.isDismissed) {
        Swal.fire({
          icon: 'info',
          text: `수정을 취소했어요`,
          confirmButtonText: '알겠어요',
        });
        handleQuitEdit();
      }
    });
  };

  const addTags = event => {
    const filtered = localHashtags.filter(el => el === event.target.value);
    if (event.target.value !== '' && filtered.length === 0) {
      setLocalHashtags([...localHashtags, event.target.value]);
      // selectedTags([...tags, event.target.value]);
      event.target.value = '';
    }
  };

  const removeTags = indexToRemove => {
    setLocalHashtags(
      localHashtags.filter((_, index) => index !== indexToRemove),
    );
  };

  /*<--------------------------------------------------------------------------------------------------------------------->*/

  function handleHashtags(event) {
    // onFilter(selectedHashtag);
    console.log(
      '------------- 클릭시 localHashtags는 어떻게 되나요 ? :',
      localHashtags,
    );
    toggleClicked(event);
  }

  /*<--------------------------------------------------------------------------------------------------------------------->*/
  return (
    <DiaryEditorBox>
      <div className="info">
        {isEdit ? (
          <>
            <div className="title_edit">
              <input
                className="title_info"
                ref={lacalTitleInput}
                value={localTitle}
                onChange={e => setLocalTitle(e.target.value)}
              />
            </div>
            <div className="content_edit">
              <textarea
                ref={localContentInput}
                value={localContent}
                onChange={e => setLocalContent(e.target.value)}
              />
            </div>
            <TagsInput>
              <ul id="tags">
                {localHashtags.map((tag, index) => (
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
                onKeyUp={event =>
                  event.key === 'Enter' ? addTags(event) : null
                }
                placeholder="입력할테면해보시지"
              />
            </TagsInput>
          </>
        ) : (
          <>
            {faFishFinsIcon}
            <div className="title" ref={titleInput}>
              {title}
            </div>
            <div className="content">{content}</div>
            <div className="hashtags">
              {localHashtags.length === 0 ? (
                <TagsInput display="none" />
              ) : (
                <TagsInput display="flex">
                  <ul id="tags">
                    {localHashtags.map((tag, index) => (
                      <li key={index} className="tag">
                        <span
                          className="tag-title"
                          onClick={event => {
                            console.log(
                              '----------- 해시태그 클릭시 localHashtag는 어떻게 되나요 ?',
                              event.target.innerText,
                            );
                            handleHashtags(event);
                          }}
                        >
                          {tag}
                        </span>
                      </li>
                    ))}
                  </ul>
                </TagsInput>
              )}
            </div>
          </>
        )}

        <br />
        <span className="date">
          작성 시간 :{String(write_date).slice(0, 16)}
        </span>
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
    </DiaryEditorBox>
  );
}

export default memo(DiaryEditor);

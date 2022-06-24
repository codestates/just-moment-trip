import React, { useState } from 'react';
import Swal from 'sweetalert2';
import {
  CommentBox,
  CommentDiv,
  CommentEditTextareaBox,
  Btn,
  BtnBox,
} from './styles';

function Comment({
  comment,
  changeCommentHandler,
  deleteCommentHandler,
  userNickname,
}) {
  const [isEdit, setIsEdit] = useState(false);
  const [currComment, setCurrComment] = useState(comment.content);

  const editHandler = () => {
    setIsEdit(true);
  };

  const editCompleteHandler = () => {
    if (currComment === comment.comment) {
      return Swal.fire({
        backdrop: ` rgba(0,0,110,0.5)`,
        text: '수정된 내용이 없습니다',
      });
    }

    Swal.fire({
      backdrop: ` rgba(0,0,110,0.5)`,
      text: '댓글을 수정하시겠습니까?',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: '수정',
      cancelButtonText: '취소',
    }).then(result => {
      if (result.isConfirmed) {
        changeCommentHandler(comment.id, currComment);
        setIsEdit(false);
      }
    });
  };

  const deleteHandler = () => {
    Swal.fire({
      backdrop: ` rgba(0,0,110,0.5)`,
      text: '댓글을 정말 삭제하시겠습니까?',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: '삭제',
      cancelButtonText: '취소',
    }).then(result => {
      if (result.isConfirmed) {
        deleteCommentHandler(comment.id);
      }
    });
  };

  const inputHandler = event => {
    setCurrComment(event.target.value);
  };

  return (
    <CommentBox>
      <div>
        <span>닉네임 : {comment.nickname}</span>
        <span>{comment.updatedAt}</span>
      </div>
      <CommentDiv>
        {isEdit ? (
          <CommentEditTextareaBox value={currComment} onChange={inputHandler} />
        ) : (
          <div style={{ width: '70vw' }}>{comment.content}</div>
        )}
        {userNickname === comment.nickname ? (
          isEdit ? (
            <BtnBox>
              <Btn type="button" onClick={editCompleteHandler}>
                수정완료
              </Btn>
              <Btn type="button" onClick={() => setIsEdit(false)}>
                수정취소
              </Btn>
            </BtnBox>
          ) : (
            <BtnBox>
              <Btn type="button" onClick={editHandler}>
                수정
              </Btn>
              <Btn type="button" onClick={deleteHandler}>
                삭제
              </Btn>
            </BtnBox>
          )
        ) : (
          <></>
        )}
      </CommentDiv>
    </CommentBox>
  );
}

export default Comment;

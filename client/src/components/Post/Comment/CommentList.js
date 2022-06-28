import React, { useEffect, useState } from 'react';
import Comment from './Comment';
import Swal from 'sweetalert2';
import {
  CommentContainer,
  CommentBox,
  CommentWriteTextareaBox,
  Btn,
  LoginPlz,
} from './styles';
const axios = require('../../../services/comment');

function CommentList({ post_id }) {
  const [newComment, setNewComment] = useState('');
  const [data, setData] = useState([]);
  const [action, setAction] = useState(false);
  const userNickname = JSON.parse(sessionStorage.getItem('user'))?.data
    .nickname;
  const token = JSON.parse(sessionStorage.getItem('user'))?.accessToken;
  const currURL = window.location.href.split('/');

  useEffect(() => {
    axios.commentGet(currURL[currURL.length - 1]).then(res => {
      setData(res.data.data.reverse());
    });
  }, [action]);

  const newCommentHandler = event => {
    setNewComment(event.target.value);
  };

  const writeCommentHandler = async () => {
    if (newComment === '') {
      return Swal.fire({
        backdrop: ` rgba(0,0,110,0.5)`,
        text: '댓글을 입력해주세요',
      });
    }

    try {
      await axios.commentPost(currURL[currURL.length - 1], newComment);
      setNewComment('');
      setAction(!action);
    } catch (err) {
      console.log(err);
    }
  };

  const changeCommentHandler = async (id, new_comment) => {
    try {
      await axios.commentPatch(id, new_comment);
      setAction(!action);
    } catch (err) {
      console.log(err);
    }
  };

  const deleteCommentHandler = async id => {
    try {
      await axios.commentRemove(id);
      setAction(!action);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <CommentContainer>
      {token ? (
        <CommentBox>
          <div>닉네임 : {userNickname}</div>
          <div>
            <CommentWriteTextareaBox
              placeholder="댓글을 작성해주세요"
              value={newComment}
              onChange={newCommentHandler}
            />
            <Btn type="button" onClick={writeCommentHandler}>
              작성
            </Btn>
          </div>
        </CommentBox>
      ) : (
        <LoginPlz>로그인 후 댓글을 남길 수 있습니다</LoginPlz>
      )}
      {data.length > 0 ? (
        <>
          {data.map(el => {
            return (
              <Comment
                key={el.id}
                comment={el}
                changeCommentHandler={changeCommentHandler}
                deleteCommentHandler={deleteCommentHandler}
                userNickname={userNickname}
              />
            );
          })}
        </>
      ) : (
        <></>
      )}
    </CommentContainer>
  );
}

export default CommentList;

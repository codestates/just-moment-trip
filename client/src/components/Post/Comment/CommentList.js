import axios from 'axios';
import React, { useState } from 'react';
import Comment from './Comment';
import dummydata from './dummydata';
import Swal from 'sweetalert2';
import {
  CommentContainer,
  CommentBox,
  CommentWriteTextareaBox,
  Btn,
  LoginPlz,
} from './styles';

function CommentList({ comments }) {
  // const [data, setData] = useState(comments.slice());
  const [newComment, setNewComment] = useState('');
  const [data, setData] = useState(dummydata.slice());
  const userNickname = JSON.parse(sessionStorage.getItem('user'))?.data
    .nickname;
  const token = JSON.parse(sessionStorage.getItem('user'))?.accessToken;
  const url = 'http://localhost:8080/comment';
  const currURL = window.location.href.split('/');

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
      await axios.post(
        `${url}/comment`,
        { post_id: currURL[currURL.length - 1], content: newComment },
        {
          headers: {
            authorization:
              'Bearer ' +
              JSON.parse(sessionStorage.getItem('user')).accessToken,
            'Content-Type': 'application/json',
          },
          withCredentials: true,
        },
      );

      const newData = {
        nickname: userNickname,
        created_at: new Date(),
        comment: newComment,
      };
      setData([newData, ...data]);
      setNewComment('');
    } catch (err) {
      console.log(err);
    }
  };

  const changeCommentHandler = async (id, new_comment) => {
    try {
      const res = await axios.patch(
        `${url}/${id}`,
        { new_comment },
        {
          headers: {
            authorization:
              'Bearer ' +
              JSON.parse(sessionStorage.getItem('user')).accessToken,
            'Content-Type': 'application/json',
          },
          withCredentials: true,
        },
      );
      const newData = data.slice();
      newData.map(el => {
        if (el.id === id) {
          el.comment = new_comment;
        }
        return el;
      });
      setData(newData);
    } catch (err) {
      console.log(err);
    }
  };

  const deleteCommentHandler = async id => {
    try {
      await axios.delete(`${url}/${id}`);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <CommentContainer>
      <h1>댓글</h1>
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
      {data ? (
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

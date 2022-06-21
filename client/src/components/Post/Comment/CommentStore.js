import axios from 'axios';
import React, { useState } from 'react';
import Comment from './Comment';
import dummydata from './dummydata';
import { CommentContainer } from './styles';

function CommentStore({ comments }) {
  // const [data, setData] = useState(comments.slice());
  const [data, setData] = useState(dummydata.slice());

  const url = 'http://localhost:8080/comment';

  const changeCommentHandler = async (id, new_comment) => {
    try {
      await axios.patch(`${url}/${id}`, {
        headers: {
          authorization:
            'Bearer ' + JSON.parse(sessionStorage.getItem('user')).accessToken,
          'Content-Type': 'application/json',
        },
        withCredentials: true,
      });
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
      {data.map(el => {
        return (
          <Comment
            key={el.id}
            comment={el}
            changeCommentHandler={changeCommentHandler}
            deleteCommentHandler={deleteCommentHandler}
          />
        );
      })}
    </CommentContainer>
  );
}

export default CommentStore;

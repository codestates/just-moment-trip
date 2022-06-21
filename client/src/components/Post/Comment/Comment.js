import React from 'react';
import { CommentBox } from './styles';

function Comment({ comment }) {
  const userNickname = sessionStorage.getItem('user');
  return (
    <CommentBox>
      <div>
        <span>{comment?.nickname}</span>
        <span>{comment.created_at}</span>
      </div>
      <div>{comment.comment}</div>
    </CommentBox>
  );
}

export default Comment;

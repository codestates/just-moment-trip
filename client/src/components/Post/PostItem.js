/* eslint-disable no-console */
/* eslint-disable react/prop-types */
import React from 'react';
import { Link } from 'react-router-dom';
import { PostItemBox, ListTable } from './styles';

function PostItem({ data }) {
  return (
    <Link
      style={{ textDecoration: 'none', color: 'black' }}
      to={`/post/${data.id}`}
      state={{
        data,
      }}
    >
      <PostItemBox>
        <ListTable width="20">{data.nickname}</ListTable>
        <ListTable width="60" fontweight="bold">
          {data.title}
        </ListTable>
        <ListTable width="20">{data.created_at}</ListTable>
      </PostItemBox>
    </Link>
  );
}

export default PostItem;

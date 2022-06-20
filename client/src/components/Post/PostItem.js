/* eslint-disable no-console */
/* eslint-disable react/prop-types */
import React from 'react';
import { PostItemBox, ListTable } from './styles';

function PostItem({ data }) {
  return (
    <PostItemBox>
      <ListTable style={{ width: '20%' }}>{data.nickname}</ListTable>
      <ListTable style={{ width: '60%', fontWeight: 'bold' }}>
        {data.title}
      </ListTable>
      <ListTable style={{ width: '20%' }}>{data.created_at}</ListTable>
    </PostItemBox>
  );
}

export default PostItem;

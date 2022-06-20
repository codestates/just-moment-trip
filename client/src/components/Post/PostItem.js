/* eslint-disable no-console */
/* eslint-disable react/prop-types */
import React from 'react';
import { PostItemBox, ListTable } from './styles';

function PostItem({ data }) {
  // console.log('--------PostItem', data);
  return (
    <PostItemBox>
      <ListTable style={{ width: '9vw' }}>{data.nickname}</ListTable>
      <ListTable style={{ width: '50vw' }}>{data.title}</ListTable>
      <ListTable>{data.created_at}</ListTable>
    </PostItemBox>
  );
}

export default PostItem;

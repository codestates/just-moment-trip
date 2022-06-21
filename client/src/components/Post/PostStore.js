/* eslint-disable no-console */
/* eslint-disable react/prop-types */
import React, { useCallback, useEffect, useState } from 'react';
import Loading from '../common/Loading';
import PostList from './PostList';
import data from './dummydata';
import PostWriteUp from './PostWriteUp';

function PostStore() {
  const [isLoading, setIsLoading] = useState(true);
  const [datas, setDatas] = useState(data);

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(!isLoading);
    }, 0);
  }, []);

  const test = useCallback(() => {
    alert('성공');
  }, []);

  return (
    <div>
      {isLoading ? <Loading /> : <PostList datas={datas} test={test} />}
    </div>
  );
}

export default PostStore;

/* eslint-disable no-console */
/* eslint-disable react/prop-types */
import React, { useEffect, useState } from 'react';
import Loading from '../common/Loading';
import PostList from './PostList';
import data from './dummydata';

function PostStore() {
  const [isLoading, setIsLoading] = useState(true);
  const [datas, setDatas] = useState(data);

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(!isLoading);
    }, 0);
  }, []);

  return <div>{isLoading ? <Loading /> : <PostList datas={datas} />}</div>;
}

export default PostStore;

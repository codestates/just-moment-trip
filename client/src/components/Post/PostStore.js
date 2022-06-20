/* eslint-disable no-console */
/* eslint-disable react/prop-types */
import React, { useEffect, useState } from 'react';
import Loading from '../common/Loading';
import PostList from './PostList';
import data from './dummydata';

function PostStore() {
  const [isLoading, setIsLoading] = useState(true);
  const [datas, setDatas] = useState(data);
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage, setPostPerPage] = useState(10);

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(!isLoading);
    }, 0);
  }, []);

  const indexOfLast = currentPage * postsPerPage;
  const indexOfFirst = indexOfLast - postsPerPage;
  const currentPosts = posts => {
    let currentPosts = 0;
    currentPosts = datas.slice(indexOfFirst, indexOfLast);
    return currentPosts;
  };
  console.log('------------- poststore', currentPosts(datas));

  return (
    <div>
      {isLoading ? (
        <Loading />
      ) : (
        <PostList
          datas={currentPosts(datas)}
          paginate={setCurrentPage}
          totalDatas={datas.length}
          postsPerPage={postsPerPage}
        />
      )}
    </div>
  );
}

export default PostStore;

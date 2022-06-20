/* eslint-disable no-console */
/* eslint-disable react/prop-types */
import React, { useState, useEffect, useCallback } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import Pagination from './Pagination';
import PostItem from './PostItem';
import {
  DataTablesBox,
  PaginationBox,
  PostListBox,
  PostListHeaderBox,
  Label,
  SearchIcon,
  SearchInput,
} from './styles';

function PostList({ datas, paginate, totalDatas, postsPerPage }) {
  const [isClicked, setIsClicked] = useState(false);

  const searchIconClicked = useCallback(() => {
    setIsClicked(!isClicked);
  }, [isClicked, datas]);

  console.log(isClicked);

  return (
    <>
      <PostListHeaderBox>
        <Label>🕊 여행에 관해 이야기 해볼까요 ?</Label>
        <SearchIcon>
          {isClicked ? <SearchInput /> : ''}
          <FontAwesomeIcon
            icon={faMagnifyingGlass}
            onClick={searchIconClicked}
          />
        </SearchIcon>
      </PostListHeaderBox>
      <PostListBox>
        <DataTablesBox>
          {datas.reverse().map(data => (
            <PostItem key={data.id} data={data} />
          ))}
        </DataTablesBox>
        <PaginationBox>
          <Pagination
            paginate={paginate}
            totalDatas={totalDatas}
            postsPerPage={postsPerPage}
          />
        </PaginationBox>
      </PostListBox>
    </>
  );
}

export default PostList;

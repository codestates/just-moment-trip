/* eslint-disable no-unused-vars */
/* eslint-disable no-shadow */
/* eslint-disable no-console */
/* eslint-disable react/prop-types */
import React, { useState, useEffect, useCallback } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass, faPencil } from '@fortawesome/free-solid-svg-icons';
import { Link, useNavigate } from 'react-router-dom';
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
  PostTitleBox,
  ListTable,
  WriteIcon,
} from './styles';
import PostWriteUp from './PostWriteUp';

function PostList({ datas, test }) {
  const [searchIconClick, setSearchIconClick] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage, setPostPerPage] = useState(10);

  useEffect(() => {
    SearchIconClicked;
  }, [datas]);

  console.log(typeof test);

  const navigate = useNavigate();

  const newDatas = datas?.slice(0).reverse();

  const SearchIconClicked = useCallback(() => {
    setSearchIconClick(!searchIconClick);
  }, [searchIconClick]);

  // const WriteIconClicked = useCallback(() => {
  //   navigate('/post/writeup');
  //   console.log('---------------------- WriteIconClicked', '으앙');
  // }, []);

  const indexOfLast = currentPage * postsPerPage;
  const indexOfFirst = indexOfLast - postsPerPage;
  const currentPosts = posts => {
    let currentPosts = 0;
    currentPosts = posts.slice(indexOfFirst, indexOfLast);
    return currentPosts;
  };

  return (
    <>
      <PostListHeaderBox>
        <Label>🕊 여행에 관해 이야기 해볼까요 ?</Label>
        <Link
          to="/post/writeup"
          style={{ textDecoration: 'none', color: 'black' }}
          state={{
            datas,
          }}
          data={test}
        >
          <WriteIcon>
            <FontAwesomeIcon icon={faPencil} />
          </WriteIcon>
        </Link>
        <SearchIcon>
          <FontAwesomeIcon
            style={{ float: 'right' }}
            icon={faMagnifyingGlass}
            onClick={SearchIconClicked}
          />
          {searchIconClick ? <SearchInput /> : null}
        </SearchIcon>
      </PostListHeaderBox>
      <PostListBox>
        <PostTitleBox>
          <ListTable style={{ width: '15%' }}>닉네임</ListTable>
          <ListTable style={{ width: '70%', fontWeight: 'bold' }}>
            제목
          </ListTable>
          <ListTable style={{ width: '15%', marginRight: '6px' }}>
            작성날짜
          </ListTable>
        </PostTitleBox>
        <DataTablesBox>
          {currentPosts(newDatas).map(data => (
            <PostItem key={data.id} data={data} />
          ))}
        </DataTablesBox>
        <PaginationBox>
          <Pagination
            paginate={setCurrentPage}
            totalDatas={datas.length}
            postsPerPage={postsPerPage}
          />
        </PaginationBox>
      </PostListBox>
    </>
  );
}

export default PostList;

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
  Input,
  PostTitleBox,
  ListTable,
  Iconbox,
} from './styles';
import data from './dummydata';

function PostList() {
  const [datas, setDatas] = useState(data);
  const [searchIconClick, setSearchIconClick] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage, setPostPerPage] = useState(10);

  useEffect(() => {
    SearchIconClicked;
  }, [datas]);

  const navigate = useNavigate();

  const newDatas = datas?.slice(0).reverse();

  const SearchIconClicked = useCallback(() => {
    setSearchIconClick(!searchIconClick);
  }, [searchIconClick]);

  // const IconboxClicked = useCallback(() => {
  //   navigate('/post/writeup');
  //   console.log('---------------------- IconboxClicked', '으앙');
  // }, []);

  const indexOfLast = currentPage * postsPerPage;
  const indexOfFirst = indexOfLast - postsPerPage;
  const currentPosts = posts => {
    let currentPosts = 0;
    currentPosts = posts.slice(indexOfFirst, indexOfLast);
    return currentPosts;
  };

  return (
    <div>
      <PostListHeaderBox>
        <Label>🕊 여행에 관해 이야기 해볼까요 ?</Label>
        <Link
          to="/post/writeup"
          style={{ textDecoration: 'none', color: 'black' }}
        >
          <Iconbox fontSize="40">
            <FontAwesomeIcon icon={faPencil} />
          </Iconbox>
        </Link>
        <SearchIcon>
          <FontAwesomeIcon
            style={{ float: 'right' }}
            icon={faMagnifyingGlass}
            onClick={SearchIconClicked}
          />
          {searchIconClick ? <Input width="30" /> : null}
        </SearchIcon>
      </PostListHeaderBox>
      <PostListBox>
        <PostTitleBox>
          <ListTable width="15">닉네임</ListTable>
          <ListTable width="70 " fontWeight="bold">
            제목
          </ListTable>
          <ListTable width="15" marginRight="6">
            작성날짜
          </ListTable>
        </PostTitleBox>
        <DataTablesBox>
          {currentPosts(newDatas).map(el => (
            <PostItem key={el.id} data={el} />
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
    </div>
  );
}

export default PostList;

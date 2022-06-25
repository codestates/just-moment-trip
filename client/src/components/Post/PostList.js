/* eslint-disable no-unused-vars */
/* eslint-disable no-shadow */
/* eslint-disable no-console */
/* eslint-disable react/prop-types */
import React, { useState, useEffect, useCallback } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass, faPencil } from '@fortawesome/free-solid-svg-icons';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
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
  const [datas, setDatas] = useState([]);
  const [searchIconClick, setSearchIconClick] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage, setPostPerPage] = useState(10);
  const token = JSON.parse(sessionStorage.getItem('user'))?.accessToken;
  const url = 'http://localhost:8080';

  useEffect(() => {
    searchIconClicked;
  }, [datas]);

  useEffect(() => {
    axios
      .get(`${url}/post`, {
        withCredentials: true,
      })
      .then(res => {
        console.log(res.data.data);
        setDatas(res.data.data.reverse());
      })
      .catch(err => console.log('--------------- 루저ㅋ', err, err.data));
  }, []);

  const navigate = useNavigate();

  // const newDatas = datas?.slice(0).reverse();

  const searchIconClicked = useCallback(() => {
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
          {token && (
            <Iconbox fontSize="40">
              <FontAwesomeIcon icon={faPencil} />
            </Iconbox>
          )}
        </Link>
        <SearchIcon>
          <FontAwesomeIcon
            style={{ float: 'right', cursor: 'pointer' }}
            icon={faMagnifyingGlass}
            onClick={searchIconClicked}
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
          {currentPosts(datas).map(el => (
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

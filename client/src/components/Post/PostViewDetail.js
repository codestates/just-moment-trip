import React, { useCallback, useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import ReactHtmlParser from 'react-html-parser'; //태그를 문자열로 바꿔줌 ! 이거 설정해야함 !
import Swal from 'sweetalert2';
import axios from 'axios';
import spongebob from '../../Assets/spongebob.gif';
import CommentList from './Comment/CommentList';
import {
  Btn,
  BtnBox,
  ContentBox,
  ContentListBox,
  Header,
  MiddelSentence,
  MiddleBox,
  PostViewDetailBox,
  Content,
} from './styles';

function PostViewDetail() {
  const [isEdit, setIsEdit] = useState(false);
  const url = 'http://localhost:8080';
  const token = JSON.parse(sessionStorage.getItem('user'))?.accessToken;
  const userNickname = JSON.parse(sessionStorage.getItem('user'))?.data
    .nickname;
  const location = useLocation();
  const navigate = useNavigate();

  // eslint-disable-next-line consistent-return
  useEffect(() => {
    if (location.state === undefined || location.state === null) {
      Swal.fire({
        title: `🚨 삐빅-🚨
         비정상적인 접근 감지됐어요 ! `,
        text: '게시판에서 글을 선택해주세요',
        icon: 'warning',
        allowOutsideClick: false,
        confirmButtonText: '알겠어요',
        backdrop: `
        rgba(0,0,110,0.5)
        url(${spongebob})
        no-repeat
      `,
      }).then(result => {
        if (result.isConfirmed) {
          navigate('/post');
        }
      });
    }
  }, []);

  const editHandler = useCallback(() => {
    setIsEdit(true);
  }, []);

  const onDelete = useCallback(() => {
    Swal.fire({
      title: `게시글을 삭제할까요 ?`,
      icon: 'question',
      allowOutsideClick: false,
      showCancelButton: true,
      confirmButtonText: '네',
      cancelButtonText: '아니오',
      backdrop: `
        rgba(0,0,110,0.5)
        url(${spongebob})
        no-repeat
      `,
    }).then(res => {
      if (res.isConfirmed) {
        Swal.fire({
          icon: 'success',
          title: '삭제 완료!',
          confirmButtonText: '알겠어요',
          backdrop: `
            rgba(0,0,110,0.5)
            url(${spongebob})
            left bottom
            no-repeat
          `,
        });
        axios
          .delete(
            `${url}/post/${location.state?.data.id}`,
            {
              id: location.state?.data.id,
            },
            {
              headers: {
                authorization:
                  'Bearer ' +
                  JSON.parse(sessionStorage.getItem('user'))?.accessToken,
                'Content-Type': 'application/json',
              },
              withCredentials: true,
            },
          )
          .then(() => navigate('/post'));
      }
    });
  }, []);
  console.log('id확인', location.state?.data.id);
  const onEdit = useCallback(() => {
    console.log('수정버튼활성화');
  }, []);

  console.log('------PostViewDetail', location.state?.data.nickname);
  return (
    <PostViewDetailBox>
      <Header>글제목 : {location.state?.data.title}</Header>
      <MiddleBox>
        <MiddelSentence>
          작성자 : {location.state?.data.nickname}
        </MiddelSentence>
        <MiddelSentence>
          적성날짜 : {location.state?.data.created_at}
        </MiddelSentence>
      </MiddleBox>
      <ContentBox>
        <Content>{ReactHtmlParser(location.state?.data.content)}</Content>
      </ContentBox>
      <BtnBox>
        {token &&
          // eslint-disable-next-line no-nested-ternary
          (userNickname === location.state?.data.nickname ? (
            isEdit ? (
              <>
                <Btn onClick={() => {}}>수정완료</Btn>
                <Btn onClick={() => setIsEdit(false)}>수정취소</Btn>
              </>
            ) : (
              <>
                <Btn onClick={editHandler}>수정하기</Btn>
                <Btn onClick={onDelete}>삭제하기</Btn>
              </>
            )
          ) : null)}
      </BtnBox>
      <ContentListBox>
        <CommentList />
      </ContentListBox>
    </PostViewDetailBox>
  );
}

export default PostViewDetail;

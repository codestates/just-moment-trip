import React, { useCallback, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import ReactHtmlParser from 'react-html-parser'; //태그를 문자열로 바꿔줌 ! 이거 설정해야함 !
/* ReactHtmlParser(content) */
import Swal from 'sweetalert2';
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
} from './styles';

function PostViewDetail({ data }) {
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

   useCallback(() => { },[])

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
        <p>{location.state?.data.content}</p>
      </ContentBox>
      <BtnBox>
        <Btn>수정하기</Btn>
        <Btn>삭제하기</Btn>
      </BtnBox>
      <ContentListBox>
        <CommentList />
      </ContentListBox>
    </PostViewDetailBox>
  );
}

export default PostViewDetail;

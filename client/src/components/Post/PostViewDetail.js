import React, { useCallback, useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import ReactHtmlParser from 'react-html-parser'; //태그를 문자열로 바꿔줌 ! 이거 설정해야함 !
import Swal from 'sweetalert2';
import axios from 'axios';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
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
  Warning,
  PostEditBox,
  Input,
  EditedSentence,
} from './styles';

function PostViewDetail() {
  const location = useLocation();
  const navigate = useNavigate();
  const [newTitle, setNewTitle] = useState('');
  const [newContent, setNewContent] = useState('');
  const [createdDate, setCreatedDate] = useState('');
  const [updatedDate, setUpdatedDate] = useState('');
  const [action, setAction] = useState(false);

  const [nickname, setNickname] = useState(`${location.state?.data.nickname}`);
  // const [arrNewContent, setArrNewContent] = useState([]);
  const [isEdit, setIsEdit] = useState(false);

  const url = process.env.REACT_APP_URL;
  const token = JSON.parse(sessionStorage.getItem('user'))?.accessToken;
  const userNickname = JSON.parse(sessionStorage.getItem('user'))?.data
    .nickname;

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

  useEffect(() => {
    axios
      .get(`${url}/post/${location.state?.data.id}`, {
        withCredentials: true,
      })
      .then(res => {
        setNewTitle(res.data.data.title);
        setNewContent(res.data.data.content);
        setCreatedDate(res.data.data.created_at);
        setUpdatedDate(res.data.data.updated_at);
      })
      .catch(err => console.error(err));
  }, [action]);

  const onChangeNewTitle = useCallback(e => {
    e.preventDefault();
    setNewTitle(e.target.value);
  }, []);

  const onChangeNewContent = useCallback((event, editor) => {
    const data = editor.getData();
    setNewContent(`${data}`);
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
          .delete(`${url}/post/${location.state?.data.id}`, {
            headers: {
              authorization:
                'Bearer ' +
                JSON.parse(sessionStorage.getItem('user'))?.accessToken,
              'Content-Type': 'application/json',
            },
            withCredentials: true,
          })
          .then(() => navigate('/post'));
      }
    });
  }, []);

  const onEdit = useCallback(() => {
    Swal.fire({
      title: `게시글을 수정할까요 ?`,
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
        axios
          .patch(
            `${url}/post/${location.state?.data.id}`,
            {
              new_content: newContent,
              new_title: newTitle,
              new_trip_id: 1,
            },
            {
              headers: {
                authorization:
                  'Bearer ' +
                  JSON.parse(sessionStorage.getItem('user')).accessToken,
                'Content-Type': 'application/json',
              },
              withCredentials: true,
            },
          )
          .then(() => {
            Swal.fire({
              icon: 'success',
              title: '수정 완료!',
              confirmButtonText: '알겠어요',
              backdrop: `
            rgba(0,0,110,0.5)
            url(${spongebob})
            left bottom
            no-repeat
          `,
            });
            setIsEdit(false);
            setAction(!action);
          })
          .catch(err => console.log('--------루저ㅋ', err));
      }
    });
  }, [newTitle, newContent]);

  return (
    <PostViewDetailBox>
      {isEdit ? (
        <PostEditBox>
          <Input
            width="50"
            marginTop="5"
            marginBottom="5"
            placeholder="글제목은 최대 16자에요"
            value={newTitle}
            maxlength="16"
            onChange={onChangeNewTitle}
          />
          <CKEditor
            data={newContent}
            editor={ClassicEditor}
            config={{
              placeholder: '여기에 글을 작성하세요',
            }}
            onChange={onChangeNewContent}
          />
          <Warning>
            음란물, 차별, 비하, 혐오 및 초상권, 저작권 침해 게시물은 민,
            형사상의 책임을 질 수 있습니다.
          </Warning>
        </PostEditBox>
      ) : (
        <>
          <Header>글제목 : {newTitle}</Header>
          <MiddleBox>
            {createdDate === updatedDate ? null : (
              <EditedSentence>수정된 글입니다</EditedSentence>
            )}
            <MiddelSentence>작성자 : {nickname}</MiddelSentence>
            <MiddelSentence>작성날짜 : {createdDate}</MiddelSentence>
          </MiddleBox>
          <ContentBox>
            <Content>{ReactHtmlParser(newContent)}</Content>
          </ContentBox>
        </>
      )}

      <BtnBox>
        {token &&
          // eslint-disable-next-line no-nested-ternary
          (userNickname === location.state?.data.nickname ? (
            isEdit ? (
              <>
                <Btn onClick={onEdit}>수정완료</Btn>
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

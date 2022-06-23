import React, { useCallback, useState, useEffect } from 'react';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPaperPlane } from '@fortawesome/free-solid-svg-icons';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';
import spongebob from '../../Assets/spongebob.gif';
import Navbar from '../common/Navbar';
import {
  Box,
  PostWriteUpDetailBox,
  Input,
  Warning,
  Iconbox,
  Error,
} from './styles';

function PostWriteUpDetail() {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [arrContent, setArrContent] = useState([]);
  const [titleError, setTitleError] = useState(false);
  const [contentError, setContentError] = useState(false);

  const navigate = useNavigate();

  const onChangeTitle = useCallback(
    e => {
      e.preventDefault();
      setTitle(e.target.value);
      console.log('-------------- title', e.target.value);
    },
    [title],
  );

  const onChangeContent = useCallback((event, editor) => {
    const data = editor.getData();
    console.log('-------------- onChangeContent', { event, editor, data });
    setContent({
      ...content,
      content: data,
    });
  }, []);

  const submit = useCallback(
    e => {
      if (title.length < 1) {
        e.preventDefault();
        setTitleError(true);
        return;
      }
      setTitleError(false);
      if (content.length < 1) {
        e.preventDefault();
        setContentError(true);
        return;
      }
      setContentError(false);

      Swal.fire({
        title: `게시글 작성을 완료할까요 ?`,
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
      }).then(result => {
        if (result.isConfirmed) {
          console.log('전송성공');
          setArrContent(arrContent.concat({ ...content }));
          console.log('----------------- arrContent', arrContent);
          console.log('----------------- content', content);
          navigate('/post');
        }
      });
    },
    [title, content],
  );

  return (
    <Box>
      <Navbar />
      <PostWriteUpDetailBox>
        <Input
          width="50"
          marginBottom="2"
          placeholder="글제목은 최대 16자에요"
          value={title}
          maxlength="16"
          onChange={onChangeTitle}
        />
        <CKEditor
          editor={ClassicEditor}
          config={{
            placeholder: '여기에 글을 작성하세요',
          }}
          onChange={onChangeContent}
        />
        <Warning>
          음란물, 차별, 비하, 혐오 및 초상권, 저작권 침해 게시물은 민, 형사상의
          책임을 질 수 있습니다.
        </Warning>
        {titleError ? (
          <Error color="red">글 제목을 한 글자 이상 입력해주세요</Error>
        ) : null}
        {contentError ? (
          <Error color="rgb(70, 125, 196)">
            글 내용을 한 글자 이상 입력해주세요
          </Error>
        ) : null}

        <Iconbox fontSize="30">
          <FontAwesomeIcon icon={faPaperPlane} onClick={submit} />
        </Iconbox>
      </PostWriteUpDetailBox>
    </Box>
  );
}

export default PostWriteUpDetail;

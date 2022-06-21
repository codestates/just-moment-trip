import React, { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import spongebob from '../../Assets/spongebob.gif';

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

  return (
    <div>
      <p>{location.state?.data.id}</p>
      <p>{location.state?.data.nickname}</p>
      <p>{location.state?.data.title}</p>
      <p>{location.state?.data.content}</p>
      <p>{location.state?.data.created_at}</p>
    </div>
  );
}

export default PostViewDetail;

import React, { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

function PostViewDetail({ data }) {
  const location = useLocation();
  const navigate = useNavigate();

  // eslint-disable-next-line consistent-return
  useEffect(() => {
    if (location.state === undefined || location.state === null) {
      alert('ㄲㅈ');
      navigate('/post');
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

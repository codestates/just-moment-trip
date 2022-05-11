import React, { useState, useEffect } from 'react';
import axios from 'axios';
import UserInfo from './UserInfo';
import ButtonHandler from './ButtonHandler';
import { useNavigate } from 'react-router-dom';

function InfoButton() {
  const [userInfo, setUserInfo] = useState({
    email: '',
    nickname: '',
    num_trips: 0,
  });

  useEffect(() => {
    getUserInfo();
  }, []);

  const navigate = useNavigate();
  const url = 'https://www.just-moment-trip.tk/user';
  const options = {
    headers: {
      authorization:
        'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZW1haWwiOiJjaGxndXNhbHMzQGdtYWlsLmNvbSIsImlhdCI6MTY1MjIzNjY5MSwiZXhwIjoxNjUyMzQ0NjkxfQ.a7CvmrXNsMzDLSR7U8e_7x2_eZ9hCg9719Mv6Uhye34',
      'Content-Type': 'application/json',
    },
  };

  const userPatchHandler = async (email, password, new_password) => {
    options.data = { email, password, new_password };
    await axios.patch(url, options);
    delete options.data;
  };

  const signoutHandler = async () => {
    await axios.post('https://www.just-moment-trip.tk/sign/out', options);
    //로그인 했는지 안했는지 상태관리 하는게 있다면 false로 바꿔주기
    navigate('/');
  };

  const getUserInfo = async () => {
    const user = await axios.get(url, options);
    const pic = await axios.get('https://dog.ceo/api/breeds/image/random');
    setUserInfo({ picture: pic.data.message, ...user.data.data });
  };

  return (
    <>
      <UserInfo {...userInfo} />
      <ButtonHandler />
    </>
  );
}

export default InfoButton;

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import UserInfo from './UserInfo';
import ButtonHandler from './ButtonHandler';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

function InfoButton() {
  const [userInfo, setUserInfo] = useState({
    email: '',
    nickname: '',
    num_trips: 0,
  });

  useEffect(() => {
    getUserInfo();
  }, []);

  const accessToken = useSelector(state => state.sign.user.accessToken);
  const navigate = useNavigate();
  const url = 'https://www.just-moment-trip.tk/user';
  const options = {
    headers: {
      authorization: `Bearer ${accessToken}`,
      'Content-Type': 'application/json',
    },
  };

  const userPatchHandler = input => {
    axios
      .patch(url, input, options)
      .then(res => {
        alert('회원정보 변경 완료 다시 로그인 해주세요');
        navigate('/');
        //로그인 off
        //토큰 삭제
      })
      .catch(err => {
        alert('입력정보 다름');
      });
    delete options.data;
  };

  const signoutHandler = async () => {
    await axios.post('https://www.just-moment-trip.tk/sign/out', options);
    //로그인 했는지 안했는지 상태관리 하는게 있다면 false로 바꿔주기
    //토큰 빈 문자열로 바꿔주기
    navigate('/');
  };

  const getUserInfo = async () => {
    const user = await axios.get(url, options);
    const pic = await axios.get('https://dog.ceo/api/breeds/image/random');
    setUserInfo({ picture: pic.data.message, ...user.data.data });
  };

  const userDeleteHandler = async () => {
    await axios.delete(url, options);
    //로그인 했는지 안했는지 상태관리 하는게 있다면 false 로 바꿔주기
    //토큰 빈 문자열로 바꿔주기
    navigate('/');
  };

  return (
    <>
      <UserInfo {...userInfo} />
      <ButtonHandler
        userPatchHandler={userPatchHandler}
        userDeleteHandler={userDeleteHandler}
        signoutHandler={signoutHandler}
      />
    </>
  );
}

export default InfoButton;

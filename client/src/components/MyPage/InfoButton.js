import React, { useState, useEffect } from 'react';
import axios from 'axios';
import UserInfo from './UserInfo';
import ButtonHandler from './ButtonHandler';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { signOut } from '../../modules/Reducers/userReducer';
import Swal from 'sweetalert2';

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
  const dispatch = useDispatch();
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
        Swal.fire(
          '비밀번호가 성공적으로 변경되었습니다. 다시 로그인해주세요',
        ).then(result => {
          if (result.isConfirmed) {
            navigate('/');
          }
        });
      })
      .catch(err => {
        Swal.fire('입력정보다름').then(result => {
          if (result.isConfirmed) {
            navigate('/');
          }
        });
      });
    delete options.data;
  };

  const signoutHandler = () => {
    Swal.fire('로그아웃 하겠습니까?').then(result => {
      if (result.isConfirmed) {
        //로그인 했는지 안했는지 상태관리 하는게 있다면 false로 바꿔주기
        //토큰 빈 문자열로 바꿔주기
        dispatch(signOut());
        navigate('/');
        Swal.fire('다음에 또 뵙겠습니다').then(result => {
          if (result.isConfirmed) {
            navigate('/');
          }
        });
      }
    });
  };

  const getUserInfo = async () => {
    const user = await axios.get(url, options);
    const pic = await axios.get('https://dog.ceo/api/breeds/image/random');
    setUserInfo({ picture: pic.data.message, ...user.data.data });
  };

  const userDeleteHandler = () => {
    Swal.fire({
      title: '정말 삭제하시겠습니까?',
      text: '다시 되돌릴수없습니다!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: '삭제!',
      cancelButtonText: '취소',
    }).then(async result => {
      if (result.isConfirmed) {
        axios.delete(url, options).then(() => {
          navigate('/');
          dispatch(signOut());
          Swal.fire('더 좋은 서비스가 될수있도록 노력하겠습니다. 감사합니다.');
        });
      }
    });
    //로그인 했는지 안했는지 상태관리 하는게 있다면 false 로 바꿔주기
    //토큰 빈 문자열로 바꿔주기
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

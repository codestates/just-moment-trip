import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { kakaoLogIn } from '../../modules/Reducers/userReducer';
import Spinner from '../Spinner/index';

function KakaoSignIn() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const code = new URL(window.location.href).searchParams.get('code');
  //asdfsdf
  useEffect(() => {
    dispatch(kakaoLogIn(code))
      .unwrap()
      .then(() => {
        navigate('/');
      });
  }, []);

  return <Spinner />;
}

export default KakaoSignIn;

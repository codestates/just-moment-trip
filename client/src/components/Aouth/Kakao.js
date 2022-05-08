import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { kakaoSign } from '../../services/sign';
import Spinner from '../Spinner/index';

function KakaoSignIn() {
  const dispatch = useDispatch();
  const code = new URL(window.location.href).searchParams.get('code');

  console.log(code);
  // useEffect(async () => {
  //   await kakaoSign(code);
  // }, []);

  return <div>Loading...</div>;
}

export default KakaoSignIn;

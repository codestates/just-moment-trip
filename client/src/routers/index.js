import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from '../pages/Home';
import Diary from '../pages/Diary';
import SignUp from '../pages/SignUp';
import SignIn from '../pages/SignIn';
import KakaoSignIn from '../components/Aouth/Kakao';

const CLIENT_ID = '9d053bcc19948f007841a6c49f8f0964';
export const REDIRECT_URI = 'http://localhost:8080/oauth/callback/kakao';

export const KAKAO_AUTH_URL = `https://kauth.kakao.com/oauth/authorize?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=code`;

export default function Routers() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/diary" element={<Diary />} />
        <Route path="/sign-up" element={<SignUp />} />
        <Route path="/sign-in" element={<SignIn />} />
        <Route path="/oauth/callback/kakao" element={<KakaoSignIn />} />
      </Routes>
    </Router>
  );
}

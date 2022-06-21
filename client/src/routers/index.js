import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import loadable from '@loadable/component';

const CLIENT_ID = '9d053bcc19948f007841a6c49f8f0964';
export const REDIRECT_URI =
  'https://www.just-moment-trip.ml/oauth/callback/kakao';

export const KAKAO_AUTH_URL = `https://kauth.kakao.com/oauth/authorize?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=code`;

const Home = loadable(() => import('../pages/Home'));
const Diary = loadable(() => import('../pages/Diary'));
const SignUp = loadable(() => import('../pages/SignUp'));
const SignIn = loadable(() => import('../pages/SignIn'));
const KakaoSignIn = loadable(() => import('../components/Aouth/Kakao'));
const Account = loadable(() => import('../pages/Account'));
const MyPage = loadable(() => import('../pages/Mypage'));
const Info = loadable(() => import('../pages/Info'));
const AboutUs = loadable(() => import('../pages/AboutUs'));
const TripPage = loadable(() => import('../pages/Trip'));
const Post = loadable(() => import('../pages/Post'));
const PostView = loadable(() => import('../pages/PostView'));

export default function Routers() {
  return (
    <Router>
      <Routes>
        <Route path="/*" element={<Home />} />
        <Route path="/diary" element={<Diary />} />
        <Route path="/sign/up" element={<SignUp />} />
        <Route path="/sign/in" element={<SignIn />} />
        <Route path="/oauth/callback/kakao" element={<KakaoSignIn />} />
        <Route path="/account" element={<Account />} />
        <Route path="/post" element={<Post />} />
        <Route path="/post/:id" element={<PostView />} />
        <Route path="/myPage" element={<MyPage />} />
        <Route path="/trip" element={<TripPage />} />
        <Route path="/aboutUs" element={<AboutUs />} />
        <Route path="/info" element={<Info />} />
      </Routes>
    </Router>
  );
}

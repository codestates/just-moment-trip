import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Diary from './pages/Diary';
import Account from './pages/Account';
import MyPage from './pages/Mypage';

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/diary" element={<Diary />} />
        <Route path="/Account" element={<Account />} />
        <Route path="/Mypage" element={<MyPage />} />
      </Routes>
    </Router>
  );
}

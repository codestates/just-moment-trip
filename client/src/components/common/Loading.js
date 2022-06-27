import React from 'react';
import { Heart } from 'react-spinners-css';
import babies from '../../Assets/babies.jpg';

function Loading() {
  const loadingSentences = [
    '기분이 어때요?',
    '숙소는 편안한가요 ?',
    '거기 음식은 어땠나요?',
    '자나깨나 차조심 !',
    '기념품은 샀나요 ?',
    '🦜',
    <img src={babies} />,
    '사실은 우여곡절이 많은 웹페이지에요',
    '휴대폰! 너무 오래 보는건 좋지 않아요',
    '울적한 마음이 전환되셨으면 좋겠어요',
    '일단 오늘은 아무런 걱정하지 말아요',
    '💸 ! 있다가도 없는 것이니깐요',
    '밤새서 노는것은 좋지 않아요',
    '비상금을 충분히 챙깁시다 !',
    '기분전환이 됐나요? ',
    '소지품 분실 조심해요 !',
    '지금 생각나는 사람이 있나요 ?',
  ];

  const getRandomIndex = function (length) {
    return parseInt(Math.random() * length);
  };

  return (
    <div
      style={{
        fontFamily: 'ManfuMedium',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        paddingBottom: '78vh',
      }}
    >
      <h1 style={{ padding: '80px 0' }}>
        {loadingSentences[getRandomIndex(loadingSentences.length)]}
      </h1>
      <div style={{ marginLeft: '80px' }}>
        <Heart color="#473888" size={150} />
      </div>
    </div>
  );
}

export default Loading;

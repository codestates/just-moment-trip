import React from 'react';
import styled from 'styled-components';
import Pic from '../Picture/Pic';
import profile from './profile.jpeg';

const CardDiv = styled.div`
  background-color: rgba(0, 0, 255, 0.3);
  text-align: center;
  width: 40vw;
  border-radius: 50px;
  margin: 100px auto 70px auto;
  padding: 30px;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
  font-family: SsurroundFont;
  font-size: 0.8em;

  @media (max-width: 1400px) {
    width: 60vw;
  }

  @media (max-width: 1000px) {
    width: 80vw;
  }

  > img {
    width: 100%;
    height: 70%;
    border-radius: inherit;
  }

  > * {
    padding: 10px;
  }
`;

function UserInfo({
  picName,
  picUploadHandler,
  picture,
  nickname,
  email,
  num_trips,
}) {
  const picUrl = `https://${process.env.REACT_APP_BUCKET}.s3.ap-northeast-2.amazonaws.com/${picture}`;

  return (
    <CardDiv>
      {picName ? <img src={picUrl} /> : <img src={profile} />}
      <Pic picName={picName} picUploadHandler={picUploadHandler} />
      <div>{`닉네임 : ${nickname}`}</div>
      <div>{`이메일 : ${email}`}</div>
      <div>
        <span>총 여행 횟수는 </span>
        <span style={{ fontSize: '3em' }} className="numtrip">
          {num_trips}
        </span>
        <span>회 입니다</span>
      </div>
    </CardDiv>
  );
}

export default UserInfo;

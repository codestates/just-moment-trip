import { get } from 'lodash';
import React, { useEffect } from 'react';
import styled from 'styled-components';

const CardDiv = styled.div`
  background-color: rgba(0, 0, 255, 0.3);
  text-align: center;
  width: 30%;
  border-radius: 50px;
  margin: 0px auto 70px auto;
  padding: 30px;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
  font-family: SsurroundFont;
  font-size: 25px;

  > img {
    width: 100%;
    height: 70%;
    border-radius: inherit;
  }
`;

function UserInfo({ picture, nickname, email, num_trips }) {
  const picUrl = `https://jmtpictures.s3.ap-northeast-2.amazonaws.com/${picture}`;

  return (
    <CardDiv>
      <img src={picUrl} />
      <div>{`닉네임 : ${nickname}`}</div>
      <div>{`이메일 : ${email}`}</div>
      <div>{`총 여행 횟수는 ${num_trips}회 입니다`}</div>
    </CardDiv>
  );
}

export default UserInfo;

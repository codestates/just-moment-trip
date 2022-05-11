import React from 'react';
import styled from 'styled-components';

const CardDiv = styled.div`
  background-color: white;
  text-align: center;
  border-radius: 50px;
  margin: auto;
  margin-top: 100px;
  padding: 30px;
  width: 50%;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);

  > img {
    width: 100%;
    height: 70%;
    border-radius: inherit;
  }
`;
function UserInfo({ picture, nickname, email, num_trips }) {
  return (
    <CardDiv>
      <img src={picture} />
      <div>{`닉네임 : ${nickname}`}</div>
      <div>{`이메일 : ${email}`}</div>
      <div>{`총 여행 횟수는 ${num_trips}회 입니다`}</div>
    </CardDiv>
  );
}

export default UserInfo;

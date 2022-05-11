import React from 'react';
import styled from 'styled-components';

const CardDiv = styled.div`
  background-color: white;
  text-align: center;
  border-radius: 50px;
  margin-top: 100px;
  padding: 30px;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);

  > img {
    width: 100%;
    height: 70%;
    border-radius: inherit;
  }
`;
function InfoCard({ picture, name, gitId, link, position }) {
  return (
    <CardDiv>
      <img src={picture} />
      <div>{name}</div>
      <a href={link}>{gitId}</a>
      <div>{position}</div>
    </CardDiv>
  );
}

export default InfoCard;

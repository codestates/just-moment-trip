import React from 'react';
import styled from 'styled-components';
import LogoSrc from '../../Assets/COVID-19_travel_banner-2021.png';
import Container from './Container';
import Swal from 'sweetalert2';

const Background = styled.div`
  background-image: linear-gradient(rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.3)),
    url(${LogoSrc});
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
  text-align: center;
  font-size: 30px;
  color: white;
  width: 400px;
  margin: 10px;
  border-radius: 20px;
  :hover {
    transition: all 0.2s linear;
    transform: scale(1.2);
  }
`;
const DeleteBtn = styled.button`
  font-family: ManfuMedium;
  font-size: 18px;
  color: rgb(210, 206, 221);
  background-color: transparent;
  border: none;
  outline: 0;
  :hover {
    transition: all 0.2s linear;
    transform: scale(1.2);
  }
`;

const StartBtn = styled.button`
  font-family: ManfuMedium;
  font-size: 18px;
  color: #ff6670;
  background-color: transparent;
  border: none;
  outline: 0;
  :hover {
    transition: all 0.2s linear;
    transform: scale(1.2);
  }
`;

const Title = styled.div`
  font-weight: bold;
  font-size: 40px;
`;

const Dates = styled.div`
  font-size: 15px;
`;

const Message = styled.div`
  font-size: 30px;
  text-align: center;
  font-family: IMHyeminFont;
  font-weight: bold;
`;

function TripInfo() {
  const buttonHandler = () => {
    Swal.fire('로그인후 Trip페이지에서 체험하세요');
  };

  return (
    <Container direction={'row'} back={' rgba(225, 0, 0, .3)'}>
      <Background>
        <Title>{'맛집 투어 여행!'}</Title>
        <div>{'KRW'}</div>
        <div>{'100000000원'}</div>
        <div>{'한국'}</div>
        <Dates>
          {'2022-05-10'}~{'2022-05-20'}
        </Dates>
        <DeleteBtn type="button" onClick={buttonHandler}>
          삭제
        </DeleteBtn>
        <StartBtn type="button" onClick={buttonHandler}>
          확인하기
        </StartBtn>
      </Background>
      <Message>다녀올 여행지에 대한 정보를 입력하여</Message>
    </Container>
  );
}

export default TripInfo;

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import Modal from '../common/Modal';
import TripModal from './tripmodal';
import TripList from './triplist';
import TopBtn from '../common/TopBtn';

const StyledWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: ManfuMedium;
`;

const TripBox = styled.div`
  width: 93%;
  height: 100%;
  padding: 90px 0px 10px 0;
`;

const Container = styled.div`
  display: flex;
  justify-content: center;
`;

const StartText = styled.div`
  font-family: ManfuMedium;
  color: rgb(210, 206, 221);
  :hover {
    color: rgb(71, 56, 136);
    transition: all 0.2s linear;
    border-bottom: 5px solid pink;
  }
`;
function Trip() {
  const [images, setImages] = useState([]);

  useEffect(() => {
    axios
      .get('https://api.unsplash.com/photos/random', {
        params: {
          client_id: 'WsSyzWat1M0u7oNlzCR5GS4xDlDsyh7YGG7gFeb7yGY',
          count: 20,
        },
      })
      .then(res => {
        setImages([...images, ...res.data.map(el => el.urls.small)]);
      })
      .catch(err => {
        console.log(err);
      });
  }, []);

  return (
    <>
      <StyledWrapper>
        <TripBox>
          <TripList images={images} />
        </TripBox>
      </StyledWrapper>
      <TopBtn marginBottom={1} />
      <Container>
        <Modal name={<StartText>여행지 기록하기</StartText>}>
          <TripModal />
        </Modal>
      </Container>
    </>
  );
}

export default Trip;

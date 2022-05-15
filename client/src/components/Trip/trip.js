import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import Modal from '../common/Modal';
import TripModal from './tripmodal';
import TripList from './triplist';

const StyledWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: SsurroundFont;
`;

const TripBox = styled.div`
  width: 93%;
  height: 100%;
  padding: 90px 0px 70px;
`;

const Container = styled.div`
  display: flex;
  justify-content: center;
`;

const StartText = styled.div`
  :hover {
    transition: all 0.2s linear;
    transform: scale(1.2);
  }
`;

function Trip() {
  const [images, setImages] = useState([]);

  // useEffect(() => {
  //   axios
  //     .get('https://api.unsplash.com/photos/random', {
  //       params: {
  //         client_id: 'WsSyzWat1M0u7oNlzCR5GS4xDlDsyh7YGG7gFeb7yGY',
  //         count: 20,
  //       },
  //     })
  //     .then(res => {
  //       console.log(res.data);
  //       setImages([...images, ...res.data.map(el => el.urls.thumb)]);
  //     });
  // });

  return (
    <>
      <StyledWrapper>
        <TripBox>
          <TripList images={images} />
        </TripBox>
      </StyledWrapper>
      <Container>
        <Modal name={<StartText>START</StartText>}>
          <TripModal />
        </Modal>
      </Container>
    </>
  );
}

export default Trip;

import React from 'react';
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
  return (
    <>
      <StyledWrapper>
        <TripBox>
          <TripList />
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

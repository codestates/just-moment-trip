import React from 'react';
import styled from 'styled-components';
import Modal from '../common/Modal';
import TripModal from './tripmodal';
import TripList from './triplist';

const Container = styled.div``;

const StartText = styled.div`
  :hover {
    transition: all 0.2s linear;
    transform: scale(1.2);
  }
`;

function Trip() {
  return (
    <Container>
      <h1>Trip List</h1>
      <TripList />
      <Modal name={<StartText>START</StartText>}>
        <TripModal />
      </Modal>
    </Container>
  );
}

export default Trip;

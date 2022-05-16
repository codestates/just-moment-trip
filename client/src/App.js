import React from 'react';
import Routers from './routers';
import './App.css';
import ChatTest from './ChatTest';
import parrot5 from './Assets/parrot5.gif';
import parrot4 from './Assets/parrot4.gif';
import parrot3 from './Assets/parrot3.gif';
import { Dropdown } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { faPersonBooth } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const personBoothIcon = (
  <FontAwesomeIcon icon={faPersonBooth} style={{ fontSize: '35px' }} />
);

export default function App() {
  return (
    <>
      <div id="screen">
        <div id="screen2">
          <p>멈춰 ✋</p>
          <p>더이상 줄이지마세요 🙅‍♂️</p>
        </div>
        <div id="screen1">
          <img src={parrot3} width="300" height="300" />
          <img src={parrot4} width="300" height="300" />
        </div>
      </div>
      <div id="screen3">
        <div>
          우리사이트에는
          <br /> 총 몇마리의 <br />
          앵무가 출몰할까요?
        </div>
        <div>
          <img src={parrot5} width="300" height="300" />
        </div>
      </div>
      <div id="appScreen">
        <Routers />

        <Dropdown id="dropdownId" align="end">
          <Dropdown.Toggle align="end" variant="success" id="dropdown-basic">
            <div className="chatIconBox"> {personBoothIcon}</div>
          </Dropdown.Toggle>

          <Dropdown.Menu align="end">
            <ChatTest dispaly="red"></ChatTest>
          </Dropdown.Menu>
        </Dropdown>
      </div>
    </>
  );
}

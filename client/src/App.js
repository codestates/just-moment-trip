import React from 'react';
import Routers from './routers';
import './App.css';

export default function App() {
  return (
    <>
      <div id="appScreen">
        <Routers />
      </div>
      <div id="screen">
        <div id="screen2">
          <p>멈춰 ✋</p>
          <p>더이상 줄이지마세요 🙅‍♂️</p>
        </div>
        <div id="screen1">
          <img
            src="https://velog.velcdn.com/images/do66i/post/0637d8ed-1b9b-412a-89ab-5893e617584a/image.gif"
            width="300"
            height="300"
          />
          <img
            src="https://velog.velcdn.com/images/do66i/post/c6dcd9b1-655a-4391-b690-b86e489a7c19/image.gif"
            width="300"
            height="300"
          />
        </div>
      </div>
      <div id="screen3">
        <div>
          우리사이트에는
          <br /> 총 몇마리의 <br />
          앵무가 출몰할까요?
        </div>
        <div>
          <img
            src="https://velog.velcdn.com/images/do66i/post/fb6895ff-5249-4f39-b0f2-a7fc842352cb/image.gif"
            width="300"
            height="300"
          />
        </div>
      </div>
    </>
  );
}

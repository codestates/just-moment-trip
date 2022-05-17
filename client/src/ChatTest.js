import React from 'react';
import styled, { keyframes } from 'styled-components';

const AnimationBox = keyframes`
50% {
    border-top-color: rgb(71, 56, 136);
    border-right-color: rgb(71, 56, 136);
    -webkit-transition: width 0.25s ease-out, height 0.25s ease-out 0.25s;
    transition: width 0.25s ease-out, height 0.25s ease-out 0.25s;
  }
  99% {
    border-bottom-color: rgb(71, 56, 136);
    border-left-color: rgb(71, 56, 136);
    -webkit-transition: border-color 0s ease-out 0.5s, width 0.25s ease-out 0.5s,
      height 0.25s ease-out 0.75s;
    transition: border-color 0s ease-out 0.5s, width 0.25s ease-out 0.5s,
      height 0.25s ease-out 0.75s;
  }
  100% {
    border-color: rgb(71, 56, 136);
  }
`;

const FFFF = styled.iframe`
  border-radius: 5%;
  border: 3px solid transparent;
  animation-name: ${AnimationBox};
  animation-fill-mode: forwards;
  animation-direction: alternate;
  animation-iteration-count: infinite;
  animation-duration: 3s;
  animation-timing-function: initial;
  height: 600px;
  width: 30vw;
`;
const ChatBox = styled.div`
  background-color: transparent;
  text-align: center;
  align-items: center;
  width: 30vw;
`;

function ChatTest() {
  return (
    <>
      <ChatBox>
        <FFFF src="https://just-moment-trip.tk/" />
      </ChatBox>
    </>
  );
}

export default ChatTest;

import React from 'react';
import styled from 'styled-components';

const FFFF = styled.iframe`
  border: 3px solid red;
  height: 600px;
  width: 20vw;
`;
const ChatBox = styled.div`
  background-color: ${props => props.display};
  text-align: center;
  align-items: center;
  width: 30vw;
`;

function ChatTest() {
  return (
    <>
      <ChatBox display="cornflowerblue">
        <FFFF src="https://just-moment-trip.tk/" />
      </ChatBox>
    </>
  );
}

export default ChatTest;

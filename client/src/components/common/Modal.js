import React, { useState } from 'react';
import styled, { keyframes } from 'styled-components';

const ModalAnimation = keyframes`
  0% {
    transform: translateY(70%);
  }
  100% {
    transform: translateY(0);
  }
`;

const ModalBackdrop = styled.div`
  position: fixed;
  z-index: 999;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  background-color: rgba(0, 0, 110, 0.5);
  display: grid;
  place-items: center;
`;

const ModalContainer = styled.div`
  align-items: center;
  justify-content: center;
  height: 15px;
  /* height: 15rem; */
  text-align: center;
  margin: 0px 10px 100px 10px;
`;

const ModalBtn = styled.button`
  background-color: white;
  text-decoration: none;
  border: none;
  font-family: SsurroundFont;
  font-size: 30px;
  padding: 20px;
  color: black;
  border-radius: 30px;
  cursor: grab;
`;

const ModalView = styled.div.attrs(props => ({
  role: 'dialog',
}))`
  border-radius: 10px;
  background-color: whitesmoke;
  width: 90%;
  height: 80%;
  animation-name: ${ModalAnimation};
  animation-duration: 0.5s;

  > span.close-btn {
    margin-top: 5px;
    cursor: pointer;
  }

  > div.desc {
    margin-top: 25px;
    color: green;
  }
`;

function Modal({ children, name }) {
  const [isOpen, setIsOpen] = useState(false);
  const openModalHandler = () => {
    setIsOpen(!isOpen);
  };
  return (
    // eslint-disable-next-line react/jsx-no-useless-fragment
    <>
      <div style={{ display: 'flex' }}>
        <ModalContainer>
          <ModalBtn onClick={openModalHandler}>
            {isOpen === false ? name : name}
          </ModalBtn>
          {isOpen === true ? (
            <ModalBackdrop onClick={openModalHandler}>
              <ModalView onClick={e => e.stopPropagation()}>
                <span onClick={openModalHandler} className="close-btn">
                  &times;
                </span>
                <div className="desc">
                  {React.cloneElement(children, { openModalHandler })}
                </div>
              </ModalView>
            </ModalBackdrop>
          ) : null}
        </ModalContainer>
      </div>
    </>
  );
}

export default Modal;

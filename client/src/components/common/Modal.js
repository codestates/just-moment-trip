import React, { useState } from 'react';
import styled from 'styled-components';

const ModalBackdrop = styled.div`
  position: fixed;
  z-index: 999;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  background-color: rgba(0, 0, 0, 0.4);
  display: grid;
  place-items: center;
`;

const ModalContainer = styled.div`
  height: 15px;
  /* height: 15rem; */
  text-align: center;
  margin: 120px auto;
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
    </>
  );
}

export default Modal;

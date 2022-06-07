import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowUp } from '@fortawesome/free-solid-svg-icons';
import styled, { keyframes } from 'styled-components';

const Fadein = keyframes`
  from {
      opacity:0;
  }
  to {
      opacity:1;
  }
`;

const Bounce = keyframes`
  from {
      transform: translateY(0px);
  }
  to {
      transform: translateY(-10px);
  }
`;

const TopBtnActive = styled.button`
  cursor: pointer;
  position: fixed;
  bottom: 0.3rem;
  right: 0.3rem;
  color: rgb(71, 56, 136);
  background-color: transparent;
  padding: 0.8rem;
  margin-bottom: ${props => props.marginBottom}rem;
  margin-right: 0.7rem;
  font-size: 0.2rem;
  border: 1.5px solid rgb(71, 56, 136);
  border-radius: 45%;
  display: flex;
  box-shadow: -1px 0 4px rgba(14, 55, 63, 0.15);
  animation: ${Fadein} 2s;
  :hover {
    animation: ${Bounce} 0.5s infinite;
  }
`;

const TopBtnNone = styled.button`
  display: none;
`;

function TopBtn({ marginBottom }) {
  const [ScrollY, setScrollY] = useState(0);
  const [btnStatus, setBtnStatus] = useState(false); // 버튼 상태

  const handleFollow = () => {
    setScrollY(window.pageYOffset);
    if (ScrollY > 100) {
      // 100 이상이면 버튼이 보이게
      setBtnStatus(true);
    } else {
      // 100 이하면 버튼이 사라지게
      setBtnStatus(false);
    }
  };

  const handleTop = () => {
    // 클릭하면 스크롤이 위로 올라가는 함수
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
    setScrollY(0); // ScrollY 의 값을 초기화
    setBtnStatus(false); // BtnStatus의 값을 false로 바꿈 => 버튼 숨김
  };

  useEffect(() => {
    const watch = () => {
      window.addEventListener('scroll', handleFollow);
    };
    watch();
    return () => {
      window.removeEventListener('scroll', handleFollow);
    };
  });
  return (
    <div>
      {btnStatus ? (
        <TopBtnActive onClick={handleTop} marginBottom={marginBottom}>
          <FontAwesomeIcon icon={faArrowUp} style={{ fontSize: '20px' }} />
        </TopBtnActive>
      ) : (
        <TopBtnNone />
      )}
    </div>
  );
}

export default TopBtn;

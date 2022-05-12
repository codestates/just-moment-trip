import React, { useEffect, useRef } from 'react';
import styled from 'styled-components';
import Navbar from '../components/common/Navbar';
import AccountInfo from '../components/Info/AccountInfo';
import DiaryInfo from '../components/Info/DiaryInfo';
import GraphInfo from '../components/Info/GraphInfo';
import TripInfo from '../components/Info/TripInfo';

const Box = styled.div`
  height: 100vh;
  overflow-y: auto;
  ::-webkit-scrollbar {
    display: none;
  }
`;

function Info() {
  const body = document.querySelector('body');
  body.style.cssText += 'margin:0; overflow-y:hidden;';
  const outerRef = useRef();

  useEffect(() => {
    const wheelHandler = e => {
      e.preventDefault();
      const { deltaY } = e;
      const { scrollTop } = outerRef.current;

      const pageHeight = window.innerHeight;

      if (deltaY > 0) {
        if (scrollTop >= 0 && scrollTop < pageHeight) {
          outerRef.current.scrollTo({
            top: pageHeight,
            left: 0,
            behavior: 'smooth',
          });
        } else if (scrollTop >= pageHeight && scrollTop < pageHeight * 2) {
          outerRef.current.scrollTo({
            top: pageHeight * 2,
            left: 0,
            behavior: 'smooth',
          });
        } else {
          outerRef.current.scrollTo({
            top: pageHeight * 3,
            left: 0,
            behavior: 'smooth',
          });
        }
      } else {
        if (scrollTop >= 0 && scrollTop <= pageHeight) {
          outerRef.current.scrollTo({
            top: 0,
            left: 0,
            behavior: 'smooth',
          });
        } else if (scrollTop >= pageHeight && scrollTop <= pageHeight * 2) {
          outerRef.current.scrollTo({
            top: pageHeight,
            left: 0,
            behavior: 'smooth',
          });
        } else {
          outerRef.current.scrollTo({
            top: pageHeight * 2,
            left: 0,
            behavior: 'smooth',
          });
        }
      }
    };

    const outerDivRefCurrent = outerRef.current;
    outerDivRefCurrent.addEventListener('wheel', wheelHandler);
    return () => {
      outerDivRefCurrent.removeEventListener('wheel', wheelHandler);
    };
  }, []);
  return (
    <>
      <Navbar />
      <Box ref={outerRef}>
        <TripInfo />
        <DiaryInfo />
        <AccountInfo />
        <GraphInfo />
      </Box>
    </>
  );
}

export default Info;

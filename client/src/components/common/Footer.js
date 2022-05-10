import React from 'react';
import styled from 'styled-components';

const FooterBox = styled.div`
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: rgb(211, 226, 244);
  padding: 20px;
  height: 20px;
  width: 100%;
`;

function Footer({ totalSpentString, remainingString, PercentageOfAmountUsed }) {
  return (
    <FooterBox>
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          padding: '0 20px',
        }}
      >
        <div>
          <p>{PercentageOfAmountUsed}</p>
        </div>
        <div>
          <div>{totalSpentString}원</div>
          <div>{remainingString}원</div>
        </div>
      </div>
    </FooterBox>
  );
}

export default Footer;

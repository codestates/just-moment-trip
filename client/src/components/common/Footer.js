import React from 'react';
import styled from 'styled-components';

const FooterBox = styled.div`
  color: whitesmoke;
  font-size: 13px;
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: rgba(72, 56, 137, 0.689);
  padding: 1px;
  width: 100%;
`;

function Footer({ totalSpentString, remainingString, PercentageOfAmountUsed }) {
  return (
    <FooterBox>
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: '0 20px',
          zIndex: '2',
        }}
      >
        <div>
          <p>📎 {PercentageOfAmountUsed}</p>
        </div>
        <div>
          <div>{totalSpentString}</div>
          <div>{remainingString}</div>
        </div>
      </div>
    </FooterBox>
  );
}

export default Footer;

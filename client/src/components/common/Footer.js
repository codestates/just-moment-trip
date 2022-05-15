import React from 'react';
import styled from 'styled-components';

const FooterBox = styled.div`
  color: whitesmoke;
  font-size: 13px;
  position: fixed;
  font-family: ManfuMedium;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: rgb(37, 45, 132);
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
          textAlign: 'center',
          padding: '0 20px',
          zIndex: '2',
        }}
      >
        <div>
          <p
            style={{
              display: 'table-cell',
              verticalAlign: 'middle',
              justifyContent: 'center',
              alignItems: 'center',
              textAlign: 'center',
              fontSize: '1.5em',
            }}
          >
            📎 {PercentageOfAmountUsed}
          </p>
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

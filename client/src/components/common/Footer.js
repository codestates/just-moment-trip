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

const PercentageBar = styled.div`
  background-color: rgb(37, 45, 132);
  border-radius: 10px;
  width: 60vw;
  height: 10px;
  > div {
    height: 10px;
    border-radius: 10px;
    width: ${props => (props.width <= 100 ? props.width : 100)}%;
    background-color: ${props => (props.width <= 100 ? 'whitesmoke' : 'red')};
  }
`;

function Footer({
  totalSpentString,
  remainingString,
  PercentageOfAmountUsed,
  exchange_rate,
  target_currency,
}) {
  let totalSpentStringKrw = totalSpentString * exchange_rate;
  let remainingStringKrw = remainingString * exchange_rate;

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
            📎 {PercentageOfAmountUsed.toFixed(2)} %
          </p>
        </div>
        <PercentageBar width={PercentageOfAmountUsed}>
          <div>
            <div />
          </div>
        </PercentageBar>
        <div>
          <div>
            {totalSpentString.toLocaleString()}
            {target_currency}/{totalSpentStringKrw.toLocaleString()}원
          </div>
          <div>
            {remainingString.toLocaleString()}
            {target_currency}/{remainingStringKrw.toLocaleString()}원
          </div>
        </div>
      </div>
    </FooterBox>
  );
}

export default Footer;

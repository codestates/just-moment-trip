import React from 'react';
import { css } from '@emotion/react';
import ClockLoader from 'react-spinners/ClockLoader';

const override = css`
  display: block;
  margin: 0 auto;
  border-color: red;
`;

function LoadingSpinner() {
  return <ClockLoader css={override} size={150} />;
}

export default LoadingSpinner;

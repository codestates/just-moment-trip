import React from 'react';
import { css } from '@emotion/react';
import ClipLoader from 'react-spinners/ClipLoader';

const override = css`
  display: flex;
  margin: 0 auto;
  border-color: #9c27b0;
  border-width: 10px;
`;

const color = '#9c27b0';

function LoadingSpinner() {
  return <ClipLoader color={color} css={override} size={50} />;
}

export default LoadingSpinner;

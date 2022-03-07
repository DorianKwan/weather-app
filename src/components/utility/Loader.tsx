import React from 'react';
import styled from '@emotion/styled';
import { keyframes } from '@emotion/react';

export const Loader = () => {
  return (
    <LoadingContainer>
      <Loading aria-label="loading animation">
        <Pulse />
        <Pulse />
      </Loading>
    </LoadingContainer>
  );
};

const LoadingContainer = styled.div`
  display: grid;
  place-items: center;
  width: 100%;
  height: 100%;
`;

const Loading = styled.div`
  display: inline-block;
  position: relative;
  width: 20vh;
  height: 20vh;
`;

const rippleAnimation = keyframes`
    0% {
      top: 45%;
      left: 45%;
      width: 0;
      height: 0;
      opacity: 1;
    }
    100% {
      top: 0px;
      left: 0px;
      width: 90%;
      height: 90%;
      opacity: 0;
    }
`;

const Pulse = styled.div`
  position: absolute;
  border: 0.25rem solid #8f94fb;
  opacity: 1;
  border-radius: 50%;
  animation: ${rippleAnimation} 2s cubic-bezier(0, 0.2, 0.8, 1) infinite;

  &:nth-of-type(2) {
    animation-delay: -1s;
  }
`;

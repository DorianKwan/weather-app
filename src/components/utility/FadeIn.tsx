import React from 'react';
import { keyframes } from '@emotion/react';
import styled from '@emotion/styled';

interface AnimationProps {
  readonly duration?: number;
  readonly delay?: number;
}

export const FadeIn: React.FC<AnimationProps> = ({
  children,
  ...animationProps
}) => {
  return <FadeInWrapper {...animationProps}>{children}</FadeInWrapper>;
};

const fadeInAnimation = keyframes`
from {
  opacity 0;
  filter: blur(0.5rem);
}
to {
  opacity: 1;
  filter: blur(0);
}
`;

const FadeInWrapper = styled.div<AnimationProps>`
  opacity: 0;
  animation-name: ${fadeInAnimation};
  animation-delay: ${({ delay }) => (delay ? `${delay}s` : '0s')};
  animation-duration: ${({ duration }) => (duration ? `${duration}s` : '1.5s')};
  animation-fill-mode: forwards;
`;

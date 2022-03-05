import React from 'react';
import styled from '@emotion/styled';
import { css, keyframes } from '@emotion/react';

interface Props {
  readonly content: string;
  readonly duration?: number;
  readonly charDelay?: number;
}

export const AnimatedText = ({ content, duration, charDelay }: Props) => {
  // elements will never be moved around or new elements added
  const splitContent = content.split('').map((char: string, index: number) => {
    return char === ' ' ? (
      // eslint-disable-next-line react/no-array-index-key
      <span key={index}>&nbsp;</span>
    ) : (
      // eslint-disable-next-line react/no-array-index-key
      <span key={index}>{char}</span>
    );
  });
  return (
    <Wrapper
      // becuase a bunch of singluar span letters would be horrid for screen readers
      aria-label={content}
      charCount={splitContent.length}
      duration={duration}
      charDelay={charDelay}>
      {splitContent}
    </Wrapper>
  );
};

const animation = keyframes`
  0% {
    opacity: 0;
    transform: translateY(-2rem) skewY(10deg) skewX(10deg) rotateZ(30deg);
    filter: blur(0.5rem);
  }
  100% {
    opacity: 1;
    transform: translateY(0) skewY(0) skewX(0) rotateZ(0);
    filter: blur(0);
  }
`;

const createAnimationDelay = (charCount: number, charDelay?: number) => {
  let styles = '';

  for (let i = 1; i < charCount + 1; i++) {
    styles += `
      &:nth-of-type(${i}) {
        animation-delay: ${i * (charDelay ?? 0.1)}s;
      }
    `;
  }

  return css`
    ${styles}
  `;
};

const Wrapper = styled.span<{
  duration?: number;
  charDelay?: number;
  charCount: number;
}>`
  display: inline-block;

  span {
    display: inline-block;
    opacity: 0;
    animation-name: ${animation};
    animation-duration: ${({ duration }) => (duration ? `${duration}s` : '1s')};
    animation-fill-mode: forwards;
    ${({ charCount, charDelay }) => createAnimationDelay(charCount, charDelay)};
  }
`;

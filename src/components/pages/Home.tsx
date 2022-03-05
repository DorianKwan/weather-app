import React from 'react';
import styled from '@emotion/styled';
import { Gradient } from 'src/theme/theme';
import { useRandomGradient, useTypedTheme } from 'src/hooks';
import { keyframes } from '@emotion/react';
import { PageWrapper, AnimatedText, FadeIn } from '../utility';

export const Home = () => {
  const theme = useTypedTheme();
  const { gradient, next, prev } = useRandomGradient(theme);
  const lastColor = gradient.colors[gradient.colors.length - 1];

  return (
    <HomePageWrapper>
      <GradientContainer aria-label="gradient" background={gradient}>
        <div>
          <HomeHeading>
            <AnimatedText content="Welcome" />
          </HomeHeading>
          <HomeSubHeading>
            <AnimatedText
              charDelay={0.02}
              content="Please enjoy this simple Weather App!"
            />
          </HomeSubHeading>
          <HomeText>
            <AnimatedText
              charDelay={0.02}
              content="I didn't know what to put here so please enjoy the UI Gradient Clone!"
            />
          </HomeText>
        </div>
        <GradientInfoContainer>
          <GradientInfoWrapper delay={4.75}>
            <RandomGradientName aria-label="gradient-name">
              {gradient.fullName}
            </RandomGradientName>
            <RandomGradientActionWrapper>
              <RandomGradientActionButton onClick={prev} color={lastColor}>
                Prev
              </RandomGradientActionButton>
              <RandomGradientActionButton onClick={next} color={lastColor}>
                Next
              </RandomGradientActionButton>
            </RandomGradientActionWrapper>
          </GradientInfoWrapper>
        </GradientInfoContainer>
      </GradientContainer>
    </HomePageWrapper>
  );
};

const HomePageWrapper = styled(PageWrapper)`
  display: grid;
  place-items: center;
`;

const GradientContainer = styled.div<{ background: Gradient }>`
  position: relative;
  width: 100%;
  height: 100%;
  padding: 10vh 1rem;
  border-radius: 1.75rem;
  transition: background 0.3s linear;
  color: white;
  background: ${({ background }) => background.fallback};
  background: ${({ background }) => background.background};

  @media only screen and (min-width: 420px) {
    padding: 15vh 2rem;
  }

  @media only screen and (min-width: 767px) {
    padding: 15vh 3rem;
  }
`;

const HomeHeading = styled.h1`
  font-size: 1.75rem;

  @media only screen and (min-width: 420px) {
    font-size: 2.2rem;
    line-height: 1.2;
  }

  @media only screen and (min-width: 767px) {
    font-size: 3rem;
    line-height: 1.4;
  }
`;

const HomeSubHeading = styled.h2`
  font-size: 1.25rem;
  width: 18ch;
  margin: 0 auto;

  @media only screen and (min-width: 420px) {
    font-size: 1.5rem;
  }

  @media only screen and (min-width: 767px) {
    font-size: 1.75rem;
    width: 100%;
  }
`;

const homeTextAnimation = keyframes`
  0% {
    opacity: 1;
  }
  100% {
    opacity:0;
  }
`;

const HomeText = styled.p`
  font-size: 0.9rem;
  width: 20ch;
  margin: 0 auto;
  margin-top: 1rem;
  animation-name: ${homeTextAnimation};
  animation-delay: 4s;
  animation-duration: 1s;
  animation-fill-mode: forwards;

  @media only screen and (min-width: 420px) {
    font-size: 1rem;
  }

  @media only screen and (min-width: 767px) {
    font-size: 1.25rem;
    width: 100%;
  }
`;

const GradientInfoContainer = styled.div`
  display: grid;
  place-items: center;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  text-transform: capitalize;
`;

const GradientInfoWrapper = styled(FadeIn)`
  width: clamp(10rem, 50%, 20rem);
`;

const RandomGradientName = styled.p`
  color: white;
  font-weight: bold;
  font-size: 1.5rem;
  padding-bottom: 2rem;

  @media only screen and (min-width: 420px) {
    font-size: 1.75rem;
  }

  @media only screen and (min-width: 767px) {
    font-size: 2rem;
  }
`;

const RandomGradientActionWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  margin: 0 auto;
`;

const RandomGradientActionButton = styled.button<{ color: string }>`
  padding: 0.05rem 0.75rem;
  font-size: 1rem;
  border-radius: 0.5rem;
  border: none;
  color: ${({ color }) => color};
  font-weight: bold;
  background: white;

  @media only screen and (min-width: 420px) {
    padding: 0.09rem 1rem;
    font-size: 1.1rem;
  }

  @media only screen and (min-width: 767px) {
    padding: 0.125rem 1.25rem;
    font-size: 1.25rem;
  }
`;

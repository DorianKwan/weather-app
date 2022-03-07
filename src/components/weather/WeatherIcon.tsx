import React from 'react';
import styled from '@emotion/styled';
import { css, keyframes } from '@emotion/react';
import { FontAwesomeIcon as Icon } from '@fortawesome/react-fontawesome';
import {
  faSun,
  faMoon,
  faCloud,
  faCloudMoon,
  faCloudMoonRain,
  faCloudRain,
  faSnowflake,
} from '@fortawesome/free-solid-svg-icons';

interface WeatherIconProps {
  type: string;
  iconCode: string;
}

export const determineIcon = (type: string, iconCode: string) => {
  const isNightTime = iconCode.includes('n');
  let icon = faSun;
  let shouldSpin = false;

  switch (type) {
    case 'Clear':
      icon = isNightTime ? faMoon : faSun;
      shouldSpin = !isNightTime;
      break;
    case 'Clouds':
      icon = isNightTime ? faCloudMoon : faCloud;
      break;
    case 'Rain':
      icon = isNightTime ? faCloudMoonRain : faCloudRain;
      break;
    case 'Snow':
      icon = faSnowflake;
      shouldSpin = true;
      break;
    default:
      icon = isNightTime ? faMoon : faSun;
      shouldSpin = !isNightTime;
      break;
  }

  return { icon, shouldSpin };
};

export const WeatherIcon: React.FC<WeatherIconProps> = ({ type, iconCode }) => {
  const { icon, shouldSpin } = determineIcon(type, iconCode);

  return (
    <WeatherIconWrapper aria-label="weather icon">
      <StyledWeatherIcon spin={shouldSpin} icon={icon} />
    </WeatherIconWrapper>
  );
};

const spinAnimation = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(359deg);
  }
`;

const spinStyles = css`
  animation: ${spinAnimation} 10s infinite linear;
`;

const StyledWeatherIcon = styled(Icon)<{ spin: boolean }>`
  font-size: 5rem;
  margin: 1rem auto;
  ${({ spin }) => (spin ? spinStyles : '')}

  @media only screen and (min-width: 1200px) {
    font-size: 6.25rem;
    margin: 2rem 0;
  }
`;

const bounceAnimation = keyframes`
  /* Down motion */
  0% {transform: translateY(0px);}
  10% {transform: translateY(-2px);}
  25% {transform: translateY(-4px);}
  40% {transform: translateY(-2px);}
  50% {transform: translateY(0px);}
  /* Up motion */
  60% {transform: translateY(2px);}
  75% {transform: translateY(4px);}
  90% {transform: translateY(2px);}
  100% {transform: translateY(0px);}
`;

const WeatherIconWrapper = styled.div`
  animation: ${bounceAnimation} 1.75s infinite linear;
`;

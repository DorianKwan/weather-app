import styled from '@emotion/styled';
import React, { useState, useRef } from 'react';
import { FontAwesomeIcon as Icon } from '@fortawesome/react-fontawesome';
import { faSun } from '@fortawesome/free-solid-svg-icons';
import { useAsyncEffect } from 'src/hooks';
import { keyframes } from '@emotion/react';
import { AnimatedText, FadeIn, PageWrapper } from '../utility';

const apiKey = process.env.REACT_APP_WEATHER_API_KEY;
const ANIMATED_TEXT_DURATION = 0.05;
const FADE_IN_DELAY = 0.25;
const FADE_IN_DURATION = 1.75;

interface WeatherData {
  base: string;
  clouds: { all: number };
  cod: number;
  coord: { lon: number; lat: number };
  dt: number;
  id: number;
  main: {
    feels_like: number;
    humidity: number;
    pressure: number;
    temp: number;
    temp_max: number;
    temp_min: number;
  };
  name: string;
  timezone: number;
  visibility: number;
  weather: { description: string; icon: string; id: number; main: string }[];
  wind: {
    deg: number;
    gust: number;
    speed: number;
  };
}

export const Weather = () => {
  const [cityName, setCityName] = useState<string>('Calgary');
  const [inputVal, setInputVal] = useState<string>('');
  const [weather, setWeather] = useState<WeatherData | undefined>();

  const prevCityRef = useRef<string>('');
  const prevWeatherRef = useRef<WeatherData | undefined>();

  useAsyncEffect(async () => {
    if (apiKey && cityName !== prevCityRef.current) {
      try {
        const response = await fetch(
          `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}`,
        );

        if (!response.ok) {
          // will handle this better in next PR
          throw new Error('Open API Fetch Failed');
        }

        const weatherData = (await response.json()) as WeatherData;
        setWeather(weatherData);

        prevWeatherRef.current = weatherData;
        prevCityRef.current = cityName;
      } catch (err) {
        setWeather(prevWeatherRef.current);
        setCityName(prevCityRef.current);
        console.error(err);
      }
    }
  }, [cityName]);

  return (
    <WeatherPageWrapper>
      <WeatherContainer>
        <WeatherHeading>
          <AnimatedText duration={ANIMATED_TEXT_DURATION} content="Weather" />
        </WeatherHeading>
        <CityName>
          <AnimatedText duration={ANIMATED_TEXT_DURATION} content={cityName} />
        </CityName>
        <FadeIn delay={FADE_IN_DELAY} duration={FADE_IN_DURATION}>
          <WeatherIconWrapper>
            <WeatherIcon icon={faSun} />
          </WeatherIconWrapper>
        </FadeIn>
        <Temperature>
          <AnimatedText
            duration={ANIMATED_TEXT_DURATION}
            content={
              weather?.main?.temp?.toPrecision(4)
                ? `${weather?.main?.temp?.toPrecision(4)}K`
                : ''
            }
          />
        </Temperature>
        <FadeIn delay={FADE_IN_DELAY} duration={FADE_IN_DURATION}>
          <CityInput
            placeholder="City name"
            onChange={event => setInputVal(event.currentTarget.value)}
            onKeyPress={event => {
              if (event.key === 'Enter') {
                setCityName(inputVal);
                setInputVal('');
              }
            }}
            value={inputVal}
          />
        </FadeIn>
      </WeatherContainer>
    </WeatherPageWrapper>
  );
};

const WeatherPageWrapper = styled(PageWrapper)`
  display: grid;
  place-items: center;
`;

const WeatherContainer = styled.div``;

const WeatherHeading = styled.h1`
  font-size: 3rem;
  line-height: 1;
  margin-bottom: 0.5rem;

  @media only screen and (min-width: 1200px) {
    font-size: 4.5rem;
    margin-bottom: 0.75rem;
  }
`;

const CityName = styled.h2`
  font-size: 2rem;
  margin-bottom: 0.75rem;

  @media only screen and (min-width: 1200px) {
    font-size: 3.25em;
    margin-bottom: 1rem;
  }
`;

const weatherIconAnimation = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(359deg);
  }
`;

const WeatherIcon = styled(Icon)`
  font-size: 5rem;
  margin: 1rem auto;
  animation: ${weatherIconAnimation} 10s infinite linear;

  @media only screen and (min-width: 1200px) {
    font-size: 6.25rem;
    margin: 2rem 0;
  }
`;

const weatherWrapperAnimation = keyframes`
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
  animation: ${weatherWrapperAnimation} 1.75s infinite linear;
`;

const Temperature = styled.p`
  font-size: 3rem;
  font-weight: bold;
  margin-bottom: 1rem;

  @media only screen and (min-width: 1200px) {
    font-size: 4.25rem;
    margin-bottom: 2rem;
  }
`;

const CityInput = styled.input`
  padding: 0.5rem 0.75rem;
  border-radius: 0.75rem;
  border-style: none;
  border: 1px solid black;
  margin-bottom: 1rem;

  &:focus-visible {
    outline-color: #8f94fb;
  }

  @media only screen and (min-width: 1200px) {
    font-size: 1.75rem;
    padding: 0.75rem 1.25rem;
  }
`;

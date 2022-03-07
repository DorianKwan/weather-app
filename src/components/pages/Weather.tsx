import React, { useState, useRef } from 'react';
import styled from '@emotion/styled';
import sweetAlert from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import { useAsyncEffect, useTempConversion } from 'src/hooks';
import { AnimatedText, FadeIn, Loader, PageWrapper } from '../utility';
import { WeatherIcon } from '../weather';
import { OpenWeatherResponse, TempUnit } from '../../utils';

const MySweetAlert = withReactContent(sweetAlert);

const apiKey = process.env.REACT_APP_WEATHER_API_KEY;
const corsProxy = process.env.REACT_APP_CORS_PROXY || '';
const ANIMATED_TEXT_DURATION = 0.05;
const FADE_IN_DELAY = 0.4;
const FADE_IN_DURATION = 1.75;

interface WeatherProps {
  mockAPI?: jest.Mock<Promise<OpenWeatherResponse>, any>;
  coordinates?: { lat: number; lon: number };
}

const buildWeatherAPIURI = ({
  cityName,
  coordinates,
}: {
  cityName: string;
  coordinates?: { lat: number; lon: number };
}) => {
  let baseUrl = 'https://api.openweathermap.org/data/2.5/weather';

  const searchParams = new URLSearchParams({
    appid: process.env.REACT_APP_WEATHER_API_KEY || 'should not hit this',
  });

  if (!cityName && !coordinates) {
    searchParams.append(
      'q',
      process.env.REACT_APP_DEFAULT_CITY_NAME || 'should not hit this',
    );
  } else if (!cityName && coordinates) {
    // OpenWeatherAPI blocks fetches using geolocation due to CORS
    // so I setup a basic CORS proxy
    // setup guide https://stackoverflow.com/questions/43262121/trying-to-use-fetch-and-pass-in-mode-no-cors#answer-43268098
    baseUrl = `${corsProxy}${baseUrl}`;
    const { lat, lon } = coordinates;
    searchParams.append('lat', `${lat}`);
    searchParams.append('lon', `${lon}`);
  } else {
    searchParams.append('q', cityName);
  }

  const queryParams = searchParams.toString();

  return `${baseUrl}?${queryParams}`;
};

export const Weather: React.FC<WeatherProps> = ({ mockAPI, coordinates }) => {
  const [cityName, setCityName] = useState<string>('');
  const [inputVal, setInputVal] = useState<string>('');
  const [apiCityName, setApiCityName] = useState<string>(
    'Everywhere, Nowhere..',
  );
  const [weatherIconInfo, setWeatherIconInfo] = useState<{
    type: string;
    iconCode: string;
  }>({ type: 'Clear', iconCode: '01d' });
  const [isLoading, setIsLoading] = useState(true);

  const prevCityRef = useRef<string | undefined>();
  const prevTempRef = useRef<number | undefined>();

  const { temperature, setTemperature, tempUnit, setTempUnit } =
    useTempConversion(273.15, TempUnit.Celsius);

  useAsyncEffect(async () => {
    if (apiKey && cityName !== prevCityRef.current) {
      try {
        setIsLoading(true);

        let weatherData: undefined | OpenWeatherResponse;

        if (mockAPI) {
          weatherData = await mockAPI();
        } else {
          const response = await fetch(
            buildWeatherAPIURI({ coordinates, cityName }),
          );

          if (!response.ok) {
            throw new Error('Open API Fetch Failed');
          }

          weatherData = (await response.json()) as OpenWeatherResponse;
        }

        const tempFromAPI = weatherData?.main?.temp;
        const cityNameFromAPI = weatherData?.name;

        if (!tempFromAPI && tempFromAPI !== 0) {
          throw new Error('Temp was not found');
        }

        prevTempRef.current = tempFromAPI;
        prevCityRef.current = cityName;

        setWeatherIconInfo({
          type: weatherData.weather[0].main,
          iconCode: weatherData.weather[0].icon,
        });
        setApiCityName(cityNameFromAPI);
        setTemperature(tempFromAPI);
        setIsLoading(false);
      } catch (err) {
        setTemperature(prevTempRef.current || 0);
        setCityName(prevCityRef.current || '');
        setIsLoading(false);

        // this could be handled so much better but for time sake I've made it highly general
        MySweetAlert.fire({
          title: 'Error Fetching Weather',
          text: 'Please check your connection',
          icon: 'error',
        });
        // eslint-disable-next-line no-console
        console.error(err);
      }
    }
  }, [cityName]);

  if (isLoading) {
    return <Loader />;
  }

  return (
    <WeatherPageWrapper>
      <WeatherContainer>
        <WeatherHeading>
          <AnimatedText duration={ANIMATED_TEXT_DURATION} content="Weather" />
        </WeatherHeading>
        <CityName>
          <AnimatedText
            capitalize
            duration={ANIMATED_TEXT_DURATION}
            content={cityName || apiCityName}
          />
        </CityName>
        <FadeIn delay={FADE_IN_DELAY} duration={FADE_IN_DURATION}>
          <WeatherIcon {...weatherIconInfo} />
        </FadeIn>
        <Temperature>
          <AnimatedText
            duration={ANIMATED_TEXT_DURATION}
            content={temperature}
          />
        </Temperature>
        <FadeIn delay={FADE_IN_DELAY} duration={FADE_IN_DURATION}>
          <TempSelectWrapper>
            <TempSelect
              type="button"
              aria-label="select celsius temperature unit"
              selected={tempUnit === TempUnit.Celsius}
              onClick={() => setTempUnit(TempUnit.Celsius)}>
              °C
            </TempSelect>
            <TempSelect
              type="button"
              aria-label="select fahrenheit temperature unit"
              selected={tempUnit === TempUnit.Fahrenheit}
              onClick={() => setTempUnit(TempUnit.Fahrenheit)}>
              °F
            </TempSelect>
            <TempSelect
              type="button"
              aria-label="select kelvin temperature unit"
              selected={tempUnit === TempUnit.Kelvin}
              onClick={() => setTempUnit(TempUnit.Kelvin)}>
              K
            </TempSelect>
          </TempSelectWrapper>
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

const Temperature = styled.p`
  font-size: 3rem;
  font-weight: bold;
  margin-bottom: 1rem;

  @media only screen and (min-width: 1200px) {
    font-size: 4.25rem;
    margin-bottom: 2rem;
  }
`;

const TempSelectWrapper = styled.div`
  display: flex;
  padding-bottom: 1rem;
`;

const TempSelect = styled.button<{ selected?: boolean }>`
  border: none;
  background: ${({ selected }) => (selected ? '#DD5E89' : '#457fca')};
  color: white;
  font-weight: bold;
  flex: 1;
  padding: 0.45rem 0;

  &:first-of-type {
    border-top-left-radius: 0.75rem;
    border-bottom-left-radius: 0.75rem;
  }

  &:not(:last-of-type) {
    border-right: solid 1px white;
  }

  &:last-of-type {
    border-top-right-radius: 0.75rem;
    border-bottom-right-radius: 0.75rem;
  }

  @media only screen and (min-width: 1200px) {
    font-size: 1.6rem;
    padding: 0.5rem 0;
  }
`;

const CityInput = styled.input`
  padding: 0.5rem 0.75rem;
  border-radius: 0.75rem;
  border-style: none;
  border: 1px solid black;
  margin-bottom: 1rem;

  &:focus-visible {
    outline: none;
    border: 1px solid #8f94fb;
    box-shadow: 0 0 1px 1px #8f94fb;
  }

  @media only screen and (min-width: 1200px) {
    font-size: 1.6rem;
    padding: 0.5rem 1.25rem;
  }
`;

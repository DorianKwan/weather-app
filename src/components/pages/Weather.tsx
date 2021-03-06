import React, { useState, useRef } from 'react';
import styled from '@emotion/styled';
import sweetAlert from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import { useAsyncEffect, useTempConversion } from 'src/hooks';
import axios from 'axios';
import { AnimatedText, FadeIn, Loader, PageWrapper } from '../utility';
import { WeatherIcon } from '../weather';
import { OpenWeatherResponse, TempUnit } from '../../utils';

const MySweetAlert = withReactContent(sweetAlert);

// add 'api-key' for testing purposes (in a production app I would load config in a way where the func is mocked)
const apiKey = process.env.REACT_APP_WEATHER_API_KEY || 'api-key';
const corsProxy = process.env.REACT_APP_CORS_PROXY || '';
const defaultCityName = process.env.REACT_APP_DEFAULT_CITY_NAME || '';
const sunnyIconCode = '01d';
const ANIMATED_TEXT_DURATION = 0.05;
const FADE_IN_DELAY = 0.4;
const FADE_IN_DURATION = 1.75;

interface WeatherProps {
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
    appid: apiKey,
  });

  const isMissingCityNameAndCoord = !cityName && !coordinates;
  const isFetchingWithGeolocation = !cityName && coordinates;

  if (isMissingCityNameAndCoord) {
    searchParams.append('q', defaultCityName);
  } else if (isFetchingWithGeolocation) {
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

export const Weather: React.FC<WeatherProps> = ({ coordinates }) => {
  const [cityName, setCityName] = useState<string>('');
  const [inputVal, setInputVal] = useState<string>('');
  const [apiCityName, setApiCityName] = useState<string>(
    'Everywhere, Nowhere..',
  );
  const [weatherIconInfo, setWeatherIconInfo] = useState<{
    type: string;
    iconCode: string;
  }>({ type: 'Clear', iconCode: sunnyIconCode });
  const [isLoading, setIsLoading] = useState(true);

  const prevCityRef = useRef<string | undefined>();
  const prevTempRef = useRef<number | undefined>();

  const { temperature, setTemperature, tempUnit, setTempUnit } =
    useTempConversion(273.15, TempUnit.Celsius);

  useAsyncEffect(async () => {
    if (apiKey && cityName !== prevCityRef.current) {
      try {
        setIsLoading(true);

        const response = await axios.get<OpenWeatherResponse>(
          buildWeatherAPIURI({ coordinates, cityName }),
        );

        if (response.status !== 200) {
          if (response.status === 404) {
            throw new Error(`City ${cityName} was not found. Typo?`);
          }

          throw new Error('Open API Fetch Failed');
        }

        const weatherData = response.data;

        const tempFromAPI = weatherData?.main?.temp;
        const cityNameFromAPI = weatherData?.name;

        if (!tempFromAPI && tempFromAPI !== 0) {
          throw new Error(`Temperature for ${cityNameFromAPI} was not found.`);
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

        // error handling isn't ideal here and could be improved drastically
        const errorMessage =
          err instanceof Error ? err.message : 'Please check your connection';

        MySweetAlert.fire({
          title: 'Error Fetching Weather',
          text: errorMessage,
          icon: 'error',
        });
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
          <TempuratureInputWrapper>
            <TempSelectWrapper>
              <TempSelect
                type="button"
                aria-label="select celsius temperature unit"
                selected={tempUnit === TempUnit.Celsius}
                onClick={() => setTempUnit(TempUnit.Celsius)}>
                ??C
              </TempSelect>
              <TempSelect
                type="button"
                aria-label="select fahrenheit temperature unit"
                selected={tempUnit === TempUnit.Fahrenheit}
                onClick={() => setTempUnit(TempUnit.Fahrenheit)}>
                ??F
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
          </TempuratureInputWrapper>
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

const TempuratureInputWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const TempSelectWrapper = styled.div`
  display: flex;
  padding-bottom: 1rem;
  width: 100%;
  max-width: 21.3125rem;
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
  width: 100%;
  max-width: 21.3125rem;
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

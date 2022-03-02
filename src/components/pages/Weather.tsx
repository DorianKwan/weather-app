import React, { useEffect, useState, useRef } from 'react';

const apiKey = process.env.REACT_APP_WEATHER_API_KEY;

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
  const [cityName, setCityName] = useState<string>('');
  const [inputVal, setInputVal] = useState<string>('');
  const [weather, setWeather] = useState<WeatherData | undefined>();

  const prevCityRef = useRef<string>('');

  useEffect(() => {
    if (apiKey && cityName !== prevCityRef.current) {
      fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}`,
      )
        .then(res => res.json())
        .then((result: WeatherData) => {
          setWeather(result);
        })
        .catch(err => console.error(err));
    }
    prevCityRef.current = cityName;
  }, [cityName]);

  return (
    <>
      <h2>Weather</h2>
      <input
        placeholder="City name"
        onChange={e => setInputVal(e.currentTarget.value)}
        value={inputVal}
      />
      <button type="button" onClick={() => setCityName(inputVal)}>
        Check Weather
      </button>
      <p>The current weather is: {weather?.main?.temp}</p>
    </>
  );
};

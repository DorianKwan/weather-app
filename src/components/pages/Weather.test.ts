import userEvent from '@testing-library/user-event';
import React from 'react';
import { act } from 'react-dom/test-utils';
import { fireEvent, render, screen } from '../../utils';
import { Weather } from './Weather';

// must be lowercase for tests to work; targeted by label
const mockCityName = 'calgary';
const baseMockApiData = {
  base: '',
  clouds: { all: 0 },
  cod: 0,
  coord: { lon: 0, lat: 0 },
  dt: 0,
  id: 0,
  main: {
    feels_like: 0,
    humidity: 0,
    pressure: 0,
    temp: 0,
    temp_max: 0,
    temp_min: 0,
  },
  name: mockCityName,
  timezone: 0,
  visibility: 0,
  weather: [{ description: '', icon: '', id: 0, main: '' }],
  wind: {
    deg: 0,
    gust: 0,
    speed: 0,
  },
};

const mockAPI = jest.fn().mockResolvedValue(baseMockApiData);
const mockAPINoTemp = jest
  .fn()
  .mockResolvedValue({ ...baseMockApiData, main: undefined });

const setupWeather = async () => {
  render(React.createElement(Weather, { mockAPI }));
  const unitChangeButtons = {
    celsius: await screen.findByLabelText(/celsius/i),
    fahrenheit: await screen.findByLabelText(/fahrenheit/i),
    kelvin: await screen.findByLabelText(/kelvin/i),
  };
  const cityName = await screen.findByLabelText(mockCityName);
  const cityInput = await screen.findByPlaceholderText('City name');

  return {
    unitChangeButtons,
    cityName,
    cityInput,
  };
};

test('temp change to Celsius', async () => {
  const { unitChangeButtons } = await setupWeather();
  const { celsius: celsiusButton, kelvin: kelvinButton } = unitChangeButtons;

  act(() => {
    kelvinButton.click();
    celsiusButton.click();
  });

  const celsiusTemp = await screen.findByLabelText(/\d+ °C/);

  expect(celsiusTemp).toBeInTheDocument();
});

test('temp change to Fahrenheit', async () => {
  const { unitChangeButtons } = await setupWeather();
  const { fahrenheit: fahrenheitButton } = unitChangeButtons;

  act(() => {
    fahrenheitButton.click();
  });

  const fahrenheitTemp = await screen.findByLabelText(/\d+ °F/);

  expect(fahrenheitTemp).toBeInTheDocument();
});

test('temp change to Kelvin', async () => {
  const { unitChangeButtons } = await setupWeather();
  const { kelvin: kelvinButton } = unitChangeButtons;

  act(() => {
    kelvinButton.click();
  });

  const kelvinTemp = await screen.findByLabelText(/\d+K/);

  expect(kelvinTemp).toBeInTheDocument();
});

test('new weather info is fetched when changing city', async () => {
  const { cityInput } = await setupWeather();

  userEvent.type(cityInput, 'toronto');
  fireEvent.keyPress(cityInput, { key: 'Enter', charCode: 13 });

  const updatedCityName = await screen.findByLabelText('toronto');

  // only check if city name changes as temperature returned isn't consistent
  expect(updatedCityName).toBeInTheDocument();
});

test('error shown when no weather data is returned', async () => {
  render(React.createElement(Weather, { mockAPI: mockAPINoTemp }));

  const errorMessage = await screen.findByText(/was not found/i);

  expect(errorMessage).toBeInTheDocument();
});

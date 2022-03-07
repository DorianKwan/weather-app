import React from 'react';
import { act } from 'react-dom/test-utils';
import { render, screen, waitFor } from '../../utils';
import { Weather } from './Weather';

const mockAPI = jest.fn().mockResolvedValue({
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
  name: 'Calgary',
  timezone: 0,
  visibility: 0,
  weather: [{ description: '', icon: '', id: 0, main: '' }],
  wind: {
    deg: 0,
    gust: 0,
    speed: 0,
  },
});

test('renders weather page', async () => {
  render(React.createElement(Weather, { mockAPI }));

  const weatherContainer = await screen.findByLabelText('Weather');

  expect(weatherContainer).toBeInTheDocument();
});

test('temp change to Celsius', async () => {
  render(React.createElement(Weather, { mockAPI }));

  const kelvinButton = await screen.findByLabelText(/kelvin/i);

  act(() => {
    kelvinButton.click();
  });

  const celsiusButton = await screen.findByLabelText(/celsius/i);

  act(() => {
    celsiusButton.click();
  });

  const celsiusTemp = await screen.findByLabelText(/\d+ °C/);

  expect(celsiusTemp).toBeInTheDocument();
});

test('temp change to Fahrenheit', async () => {
  render(React.createElement(Weather, { mockAPI }));

  const fahrenheitButton = await screen.findByLabelText(/fahrenheit/i);

  act(() => {
    fahrenheitButton.click();
  });

  const fahrenheitTemp = await screen.findByLabelText(/\d+ °F/);

  expect(fahrenheitTemp).toBeInTheDocument();
});

test('temp change to Kelvin', async () => {
  render(React.createElement(Weather, { mockAPI }));

  const kelvinButton = await screen.findByLabelText(/kelvin/i);

  act(() => {
    kelvinButton.click();
  });

  const kelvinTemp = await screen.findByLabelText(/\d+K/);

  expect(kelvinTemp).toBeInTheDocument();
});

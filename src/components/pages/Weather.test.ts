import React from 'react';
import userEvent from '@testing-library/user-event';
import { act } from 'react-dom/test-utils';
import axios from 'axios';
import { fireEvent, render, screen } from '../../utils';
import { Weather } from './Weather';

jest.mock('axios');

const mockedAxios = axios as jest.Mocked<typeof axios>;

const mockCityName = 'calgary';

mockedAxios.get.mockReturnValue(
  Promise.resolve({
    status: 200,
    data: {
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
      // must be lowercase for tests to work; targeted by label
      name: 'calgary',
      timezone: 0,
      visibility: 0,
      weather: [{ description: '', icon: '', id: 0, main: '' }],
      wind: {
        deg: 0,
        gust: 0,
        speed: 0,
      },
    },
  }),
);

const setupWeather = async () => {
  render(React.createElement(Weather));
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

describe('Weather.tsx', () => {
  it('changes temp to Celsius when Celsius button is clicked', async () => {
    const { unitChangeButtons } = await setupWeather();
    const { celsius: celsiusButton, kelvin: kelvinButton } = unitChangeButtons;

    act(() => {
      kelvinButton.click();
      celsiusButton.click();
    });

    const celsiusTemp = await screen.findByLabelText(/\d+ °C/);

    expect(celsiusTemp).toBeInTheDocument();
  });

  it('changes temp to Fahrenheit when Fahrenheit is clicked', async () => {
    const { unitChangeButtons } = await setupWeather();
    const { fahrenheit: fahrenheitButton } = unitChangeButtons;

    act(() => {
      fahrenheitButton.click();
    });

    const fahrenheitTemp = await screen.findByLabelText(/\d+ °F/);

    expect(fahrenheitTemp).toBeInTheDocument();
  });

  it('changes temp to Kelvin when Kelvin is clicked', async () => {
    const { unitChangeButtons } = await setupWeather();
    const { kelvin: kelvinButton } = unitChangeButtons;

    act(() => {
      kelvinButton.click();
    });

    const kelvinTemp = await screen.findByLabelText(/\d+K/);

    expect(kelvinTemp).toBeInTheDocument();
  });

  it('displays error when no weather data is returned', async () => {
    const { cityInput } = await setupWeather();

    mockedAxios.get.mockResolvedValue(
      Promise.resolve({
        status: 404,
        data: null,
      }),
    );

    userEvent.type(cityInput, 'Narnia');
    fireEvent.keyPress(cityInput, { key: 'Enter', charCode: 13 });

    render(React.createElement(Weather));

    const errorMessage = await screen.findByText(/Error Fetching Weather/i);

    expect(errorMessage).toBeInTheDocument();
  });
});

import React from 'react';
import {
  faCloud,
  faCloudMoon,
  faCloudMoonRain,
  faCloudRain,
  faMoon,
  faSnowflake,
  faSun,
} from '@fortawesome/free-solid-svg-icons';
import { render, screen } from '../../utils';
import { WeatherIcon, determineIcon } from '.';

test('weather icon renders icon when content is clear', () => {
  render(
    React.createElement(WeatherIcon, {
      type: 'Clear',
      iconCode: '01d',
    }),
  );
  const icon = screen.getByLabelText('weather icon');
  expect(icon).toBeInTheDocument();
});

test('weather icon renders icon when content is snow', () => {
  render(
    React.createElement(WeatherIcon, {
      type: 'Snow',
      iconCode: '01d',
    }),
  );
  const icon = screen.getByLabelText('weather icon');
  expect(icon).toBeInTheDocument();
});

test('weather icon renders icon when content is rain', () => {
  render(
    React.createElement(WeatherIcon, {
      type: 'Rain',
      iconCode: '01d',
    }),
  );
  const icon = screen.getByLabelText('weather icon');
  expect(icon).toBeInTheDocument();
});

test('weather icon renders icon when content is cloudy', () => {
  render(
    React.createElement(WeatherIcon, {
      type: 'Cloudy',
      iconCode: '01d',
    }),
  );
  const icon = screen.getByLabelText('weather icon');
  expect(icon).toBeInTheDocument();
});

test('determine icon returns proper clear icon night & day', () => {
  const dayTimeClear = {
    type: 'Clear',
    iconCode: '01d',
  };

  const nightTimeClear = {
    type: 'Clear',
    iconCode: '01n',
  };

  const { icon: dayIcon, shouldSpin: dayShouldSpin } = determineIcon(
    dayTimeClear.type,
    dayTimeClear.iconCode,
  );

  expect(dayIcon === faSun).toBeTruthy();
  expect(dayShouldSpin).toBeTruthy();

  const { icon: nightIcon, shouldSpin: nightShouldSpin } = determineIcon(
    nightTimeClear.type,
    nightTimeClear.iconCode,
  );

  expect(nightIcon === faMoon).toBeTruthy();
  expect(nightShouldSpin).toBeFalsy();
});

test('determine icon returns proper rain icon night & day', () => {
  const dayTimeRain = {
    type: 'Rain',
    iconCode: '01d',
  };
  const nightTimeRain = {
    type: 'Rain',
    iconCode: '01n',
  };

  const { icon: dayIcon, shouldSpin: dayShouldSpin } = determineIcon(
    dayTimeRain.type,
    dayTimeRain.iconCode,
  );

  expect(dayIcon === faCloudRain).toBeTruthy();
  expect(dayShouldSpin).toBeFalsy();

  const { icon: nightIcon, shouldSpin: nightShouldSpin } = determineIcon(
    nightTimeRain.type,
    nightTimeRain.iconCode,
  );

  expect(nightIcon === faCloudMoonRain).toBeTruthy();
  expect(nightShouldSpin).toBeFalsy();
});

test('determine icon returns proper cloud icon night & day', () => {
  const dayTimeCloudy = {
    type: 'Cloudy',
    iconCode: '01d',
  };
  const nightTimeCloudy = {
    type: 'Cloudy',
    iconCode: '01n',
  };

  const { icon: dayIcon, shouldSpin: dayShouldSpin } = determineIcon(
    dayTimeCloudy.type,
    dayTimeCloudy.iconCode,
  );

  expect(dayIcon === faCloud).toBeTruthy();
  expect(dayShouldSpin).toBeFalsy();

  const { icon: nightIcon, shouldSpin: nightShouldSpin } = determineIcon(
    nightTimeCloudy.type,
    nightTimeCloudy.iconCode,
  );

  expect(nightIcon === faCloudMoon).toBeTruthy();
  expect(nightShouldSpin).toBeFalsy();
});

test('determine icon returns proper snow icon night & day', () => {
  const dayTimeSnow = {
    type: 'Snow',
    iconCode: '01d',
  };
  const nightTimeSnow = {
    type: 'Snow',
    iconCode: '01n',
  };

  const { icon: dayIcon, shouldSpin: dayShouldSpin } = determineIcon(
    dayTimeSnow.type,
    dayTimeSnow.iconCode,
  );

  expect(dayIcon === faSnowflake).toBeTruthy();
  expect(dayShouldSpin).toBeTruthy();

  const { icon: nightIcon, shouldSpin: nightShouldSpin } = determineIcon(
    nightTimeSnow.type,
    nightTimeSnow.iconCode,
  );

  expect(nightIcon === faSnowflake).toBeTruthy();
  expect(nightShouldSpin).toBeTruthy();
});

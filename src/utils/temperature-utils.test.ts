import {
  convertCelsiusToFahrenheit,
  convertCelsiusToKelvin,
  convertFahrenheitToCelsius,
  convertFahrenheitToKelvin,
  convertKelvinToCelsius,
  convertKelvinToFahrenheit,
} from './temperature-utils';

test('convertKelvinToCelsius', () => {
  // Formula c = K - 273.15
  const mockKelvin = 273.15;

  const celsius = convertKelvinToCelsius(mockKelvin);

  expect(celsius === 0).toBeTruthy();
});

test('convertCelsiusToKelvin', () => {
  const mockCelsius = 0;

  const kelvin = convertCelsiusToKelvin(mockCelsius);

  expect(kelvin === 273).toBeTruthy();
});

test('convertKelvinToFahrenheit', () => {
  const mockKelvin = 0;

  const celsius = Number(convertKelvinToFahrenheit(mockKelvin).toPrecision(5));

  expect(celsius === -460).toBeTruthy();
});

test('convertFahrenheitToKelvin', () => {
  const mockFahrenheit = 0;

  const kelvin = Number(
    convertFahrenheitToKelvin(mockFahrenheit).toPrecision(6),
  );

  expect(kelvin === 255).toBeTruthy();
});

test('convertCelsiusToFahrenheit', () => {
  const mockCelsius = 0;

  const fahrenheit = convertCelsiusToFahrenheit(mockCelsius);

  expect(fahrenheit === 32).toBeTruthy();
});

test('convertFahrenheitToCelsius', () => {
  const mockFahrenheit = 32;

  const celsius = convertFahrenheitToCelsius(mockFahrenheit);

  expect(celsius === 0).toBeTruthy();
});

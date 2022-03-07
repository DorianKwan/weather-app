export const convertKelvinToCelsius = (kelvin: number) => {
  const celsius = kelvin - 273.15;
  return Math.round(celsius);
};

export const convertKelvinToFahrenheit = (kelvin: number) => {
  const fahrenheit = ((kelvin - 273.15) * 9) / 5 + 32;
  return Math.round(fahrenheit);
};

export const convertCelsiusToKelvin = (celsius: number) => {
  const kelvin = celsius + 273.15;
  return Math.round(kelvin);
};

export const convertCelsiusToFahrenheit = (celsius: number) => {
  const fahrenheit = celsius * (9 / 5) + 32;
  return Math.round(fahrenheit);
};

export const convertFahrenheitToKelvin = (fahrenheit: number) => {
  const kelvin = convertFahrenheitToCelsius(fahrenheit) + 273.15;
  return Math.round(kelvin);
};

export const convertFahrenheitToCelsius = (fahrenheit: number) => {
  const celsius = (fahrenheit - 32) * (5 / 9);
  return Math.round(celsius);
};

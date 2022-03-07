export interface OpenWeatherResponse {
  base: string;
  clouds: { all: number };
  cod: number;
  coord: { lon: number; lat: number };
  dt: number;
  id: number;
  main?: {
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

export enum TempUnit {
  Celsius = 'celsuis',
  Fahrenheit = 'fahrenheit',
  Kelvin = 'kelvin',
}

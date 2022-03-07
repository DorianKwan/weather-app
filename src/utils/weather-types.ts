export interface Coordinates {
  readonly lon: number;
  readonly lat: number;
}

export interface OpenWeatherResponse {
  readonly base: string;
  readonly clouds: { all: number };
  readonly cod: number;
  readonly coord: Coordinates;
  readonly dt: number;
  readonly id: number;
  readonly main?: {
    readonly feels_like: number;
    readonly humidity: number;
    readonly pressure: number;
    readonly temp: number;
    readonly temp_max: number;
    readonly temp_min: number;
  };
  readonly name: string;
  readonly timezone: number;
  readonly visibility: number;
  readonly weather: {
    description: string;
    icon: string;
    id: number;
    main: string;
  }[];
  readonly wind: {
    readonly deg: number;
    readonly gust: number;
    readonly speed: number;
  };
}

export enum TempUnit {
  Celsius = 'celsuis',
  Fahrenheit = 'fahrenheit',
  Kelvin = 'kelvin',
}

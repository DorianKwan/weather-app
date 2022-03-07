import { useEffect, useState } from 'react';
import {
  convertKelvinToCelsius,
  convertKelvinToFahrenheit,
  TempUnit,
} from 'src/utils';

export const useTempConversion = (
  initialTemp: number,
  initialTempUnit: TempUnit,
) => {
  const [rawTemp, setRawTemp] = useState(initialTemp);
  const [tempUnit, setTempUnit] = useState(initialTempUnit);
  const [tempString, setTempString] = useState('');

  useEffect(() => {
    if (tempUnit === TempUnit.Kelvin) {
      const temp = Math.round(rawTemp);
      const tempUnitString = 'K';
      setTempString(`${temp}${tempUnitString}`);
    } else if (tempUnit === TempUnit.Celsius) {
      const temp = convertKelvinToCelsius(rawTemp);
      const tempUnitString = '°C';
      setTempString(`${temp} ${tempUnitString}`);
    } else if (tempUnit === TempUnit.Fahrenheit) {
      const temp = convertKelvinToFahrenheit(rawTemp);
      const tempUnitString = '°F';
      setTempString(`${temp} ${tempUnitString}`);
    }
  }, [rawTemp, tempUnit]);

  return {
    setTemperature: setRawTemp,
    temperature: tempString,
    setTempUnit,
    tempUnit,
  };
};

import React from 'react';
import { render, screen } from '../../utils';
import { Weather } from './Weather';

test('renders weather screen', () => {
  render(React.createElement(Weather));
  const weatherContainer = screen.getByLabelText(/weather/i);
  expect(weatherContainer).toBeInTheDocument();
});

import React from 'react';
import { render, screen } from '../../utils';
import { Weather } from './Weather';

test('renders nav sidebar', () => {
  render(React.createElement(Weather));
  const linkElement = screen.getByLabelText(/weather/i);
  expect(linkElement).toBeInTheDocument();
});

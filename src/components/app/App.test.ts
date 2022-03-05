import React from 'react';
import { render, screen } from '../../utils';
import { App } from './App';

test('renders home link', () => {
  render(React.createElement(App));
  const linkElement = screen.getByAltText(/app-logo/i);
  expect(linkElement).toBeInTheDocument();
});

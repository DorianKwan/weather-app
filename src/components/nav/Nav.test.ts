import React from 'react';
import { render, screen } from '../../utils';
import { Nav } from './Nav';

test('renders nav sidebar', () => {
  render(React.createElement(Nav));
  const linkElement = screen.getByAltText(/app-logo/i);
  expect(linkElement).toBeInTheDocument();
});

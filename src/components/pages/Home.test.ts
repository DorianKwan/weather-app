import React from 'react';
import { render, screen } from '../../utils';
import { Home } from './Home';

test('renders nav sidebar', () => {
  render(React.createElement(Home));
  const linkElement = screen.getByLabelText(/welcome/i);
  expect(linkElement).toBeInTheDocument();
});

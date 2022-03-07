import React from 'react';
import { render, screen } from '../../utils';
import { Loader } from '.';

test('Loader renders', () => {
  render(React.createElement(Loader));
  const loader = screen.getByLabelText(/loading/i);
  expect(loader).toBeInTheDocument();
});

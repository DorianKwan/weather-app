import React from 'react';
import { render, screen } from '../../utils';
import { FadeIn } from '.';

const TestText = () => {
  return <p>This is test text</p>;
};

test('FadeIn renders test when children contains test', () => {
  render(
    React.createElement(
      FadeIn,
      { delay: 0, duration: 1 },
      React.createElement(TestText),
    ),
  );
  const linkElement = screen.getByText(/Test/i);
  expect(linkElement).toBeInTheDocument();
});

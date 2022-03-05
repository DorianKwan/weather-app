import React from 'react';
import { render, screen } from '../../utils';
import { AnimatedText } from '.';

test('animated text renders test when content is test', () => {
  render(React.createElement(AnimatedText, { charDelay: 0, content: 'Test' }));
  const linkElement = screen.getByLabelText(/Test/i);
  expect(linkElement).toBeInTheDocument();
});

import React from 'react';
import { render, screen } from '../../utils';
import { PageWrapper } from '.';

const TestText = () => {
  return <p>This is test text</p>;
};

test('PageWrapper renders test when children contain test', () => {
  render(React.createElement(PageWrapper, {}, React.createElement(TestText)));
  const linkElement = screen.getByText(/test/i);
  expect(linkElement).toBeInTheDocument();
});

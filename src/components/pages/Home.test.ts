import React from 'react';
import { Theme } from 'src/theme/theme';
import { render, screen } from '../../utils';
import { Home } from './Home';

const mockTheme: Theme = {
  colors: {
    ash: '#3f4c6b',
    pink: '#f8cdda',
  },
  // BEWARE: adding more than two gradients will break these tests
  gradients: {
    blu: {
      fullName: 'Blu',
      fallback: '#00416A',
      background: 'linear-gradient(0deg, #00416A, #E4E5E6)',
      colors: ['#00416A', '#E4E5E6'],
    },
    verBlack: {
      fullName: 'Ver Black',
      fallback: '#F7F8F8',
      background: 'linear-gradient(0deg, #F7F8F8, #ACBB78)',
      colors: ['#F7F8F8', '#ACBB78'],
    },
  },
};

const determineLeftOverGradient = (initialGradientName: string) => {
  // airbnb doesn't like it when you return, break or continue in a loop ¯\_(ツ)_/¯
  // eslint-disable-next-line no-restricted-syntax
  for (const gradient of Object.values(mockTheme.gradients)) {
    if (gradient.fullName !== initialGradientName) return gradient.fullName;
  }
};

test('renders nav sidebar', () => {
  render(React.createElement(Home));
  const linkElement = screen.getByLabelText(/welcome/i);
  expect(linkElement).toBeInTheDocument();
});

test('render correct next gradient', async () => {
  render(React.createElement(Home), {}, mockTheme);

  // determine name because gradient is random on load
  const initialGradientName = screen.getByLabelText('gradient-name').innerHTML;

  if (!initialGradientName) {
    throw new Error('Initial Gradient did not exist on screen attribute');
  }

  const nextButton = screen.getByText('Next');
  nextButton.click();

  const currentGradientName = screen.getByLabelText('gradient-name').innerHTML;

  const leftOverGradientName = determineLeftOverGradient(initialGradientName);

  expect(currentGradientName === leftOverGradientName).toBeTruthy();
});

test('render correct prev gradient', async () => {
  render(React.createElement(Home), {}, mockTheme);

  // determine name because gradient is random on load
  const initialGradientName = screen.getByLabelText('gradient-name').innerHTML;

  if (!initialGradientName) {
    throw new Error('Initial Gradient did not exist on screen attribute');
  }

  const prevButton = screen.getByText('Prev');
  prevButton.click();

  const currentGradientName = screen.getByLabelText('gradient-name').innerHTML;

  const leftOverGradientName = determineLeftOverGradient(initialGradientName);

  expect(currentGradientName === leftOverGradientName).toBeTruthy();
});

test('render correct gradient when end is hit using next', async () => {
  render(React.createElement(Home), {}, mockTheme);

  // determine name because gradient is random on load
  const initialGradientName = screen.getByLabelText('gradient-name').innerHTML;

  if (!initialGradientName) {
    throw new Error('Initial Gradient did not exist on screen attribute');
  }

  const nextButton = screen.getByText('Next');
  nextButton.click();
  nextButton.click();

  const currentGradientName = screen.getByLabelText('gradient-name').innerHTML;

  expect(initialGradientName === currentGradientName).toBeTruthy();
});

test('render correct gradient when end is hit using prev', async () => {
  render(React.createElement(Home), {}, mockTheme);

  // determine name because gradient is random on load
  const initialGradientName = screen.getByLabelText('gradient-name').innerHTML;

  if (!initialGradientName) {
    throw new Error('Initial Gradient did not exist on screen attribute');
  }

  const prevButton = screen.getByText('Prev');
  prevButton.click();
  prevButton.click();

  const currentGradientName = screen.getByLabelText('gradient-name').innerHTML;

  expect(initialGradientName === currentGradientName).toBeTruthy();
});

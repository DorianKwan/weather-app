import React, { StrictMode } from 'react';
import { render, RenderOptions } from '@testing-library/react';
import styled from '@emotion/styled';
import { ThemeProvider } from '@emotion/react';
import theme from '../theme/theme';

const AllProviders: React.FC = ({ children }) => {
  return (
    <StrictMode>
      <ThemeProvider theme={theme}>
        <AppContainer>{children}</AppContainer>
      </ThemeProvider>
    </StrictMode>
  );
};

const AppContainer = styled.main`
  text-align: center;
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  overflow: auto;
`;

const customRender = (
  ui: React.ReactElement,
  options?: Omit<RenderOptions, 'wrapper'>,
) => render(ui, { wrapper: AllProviders, ...options });

export * from '@testing-library/react';
export { customRender as render };

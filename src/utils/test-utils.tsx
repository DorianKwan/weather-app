import React, { StrictMode } from 'react';
import { render, RenderOptions } from '@testing-library/react';
import styled from '@emotion/styled';
import { ThemeProvider } from '@emotion/react';
import theme, { Theme } from '../theme/theme';

interface AllProvidersProps {
  themeOverride?: Theme;
}

const AllProviders: React.FC<AllProvidersProps> = ({
  children,
  themeOverride,
}) => {
  return (
    <StrictMode>
      <ThemeProvider theme={themeOverride ?? theme}>
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
  themeOverride?: Theme,
) => {
  const ThemeOverride: React.FC = ({ children }) => {
    return (
      <AllProviders themeOverride={themeOverride}>{children}</AllProviders>
    );
  };

  const wrapper = themeOverride ? ThemeOverride : AllProviders;

  render(ui, { wrapper, ...options });
};

export * from '@testing-library/react';
export { customRender as render };

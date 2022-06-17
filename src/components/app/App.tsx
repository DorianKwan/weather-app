import React, { StrictMode } from 'react';
import styled from '@emotion/styled';
import { Nav } from '../nav/Nav';

export const App = () => {
  return (
    <StrictMode>
      <AppContainer>
        <Nav />
      </AppContainer>
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

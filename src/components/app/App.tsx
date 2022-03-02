import React, { StrictMode } from 'react';
import { Nav } from '../nav/Nav';
import './App.css';

export const App = () => {
  return (
    <StrictMode>
      <div className="App">
        <Nav />
      </div>
    </StrictMode>
  );
};

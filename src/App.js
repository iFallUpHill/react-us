import React from 'react';
import styled, { createGlobalStyle } from 'styled-components';
import UnlockManifolds from './tasks/UnlockManifolds';
import RecordTemperature from './tasks/RecordTemperature';
import RepairDrill from './tasks/RepairDrill';
import SwipeCard from './tasks/SwipeCard';
import Divider from './components/Divider';
import Footer from './components/Footer';

const GlobalStyle = createGlobalStyle`
  body {
    box-sizing: border-box;
    border: 1rem #F17D0E solid;
    padding: 2rem;
    margin: 0;
    font-family: -apple-system, BlinkMacSystemFont,
    'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell',
    'Fira Sans', 'Droid Sans', 'Helvetica Neue',
    sans-serif;
  }
`

function App() {
  return (
    <>
      <GlobalStyle />
      <UnlockManifolds />
      <Divider />
      <RecordTemperature />
      <Divider />
      <RepairDrill />
      <Divider />
      <SwipeCard />
      <Divider />
      <Footer />
    </>
  );
}

export default App;

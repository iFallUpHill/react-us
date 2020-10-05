import React from 'react';
import UnlockManifolds from './minigames/UnlockManifolds';
import RecordTemperature from './minigames/RecordTemperature';
import RepairDrill from './minigames/RepairDrill';
import SwipeCard from './minigames/SwipeCard';

function App() {
  return (
    <div>
      <h1>React Us (Among Us but React)</h1>
      <UnlockManifolds />
      <RecordTemperature />
      <RepairDrill />
      <SwipeCard />
    </div>
  );
}

export default App;

import React from 'react';
import UnlockManifolds from './tasks/UnlockManifolds';
import RecordTemperature from './tasks/RecordTemperature';
import RepairDrill from './tasks/RepairDrill';
import SwipeCard from './tasks/SwipeCard';

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

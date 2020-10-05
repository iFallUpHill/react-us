import React from 'react';
import UnlockManifolds from './minigames/UnlockManifolds';
import RecordTemperature from './minigames/RecordTemperature';
import RepairDrill from './minigames/RepairDrill';

function App() {
  return (
    <div>
      <h1>React Us (Among Us but React)</h1>
      <UnlockManifolds />
      <RecordTemperature />
      <RepairDrill />
    </div>
  );
}

export default App;

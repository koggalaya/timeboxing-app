import React from 'react';
import TimeboxingLayout from './components/TimeboxingLayout';
import Timebox from './components/Timebox';

function App() {
  return (
    <TimeboxingLayout>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Timebox title="Work" duration={1} />
        <Timebox title="Break" duration={1} />
        <Timebox title="Walk" duration={1} />
      </div>
    </TimeboxingLayout>
  );
}

export default App;
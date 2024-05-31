import React, { useState } from 'react';
import './App.css';
import Grid from './components/Grid';
import Button from './components/Button';
import WinAlert from './components/WinAlert';

function App() {
  const [progress, setProgress] = useState(0); // 0: start, 1: in progress, 2: won

  return (
    <>
    <div className="container">
      <div className="content">
        <Grid progress={progress} setProgress={setProgress} />
        <Button text="Reset Game" handleClick={setProgress} />
      </div>
    </div>
    <WinAlert progress={progress} setProgress={setProgress} />
    </>
  );
}

export default App;

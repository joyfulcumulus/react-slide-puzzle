import './App.css';
import Grid from './components/Grid';
import Button from './components/Button';
import WinAlert from './components/WinAlert';

function App() {
  return (
    <>
    <div className="container">
      <div className="content">
        <Grid />
        <Button text="Reset Game" />
      </div>
    </div>
    <WinAlert />
    </>
  );
}

export default App;

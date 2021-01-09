import './App.css';
import Game from './components/Game';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src="logo192.png" className="App-logo" alt="logo" />
        <a
          className="App-link font-effect-fire-animation"
          href="https://jessehu.me"
          target="_blank"
          rel="noopener noreferrer"
        >
          <h1>Connect 4</h1>
        </a>
        <Game/>
      </header>
    </div>
  );
}

export default App;

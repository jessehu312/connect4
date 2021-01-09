import logo from './logo.svg';
import './App.css';
import Board from './components/Board';

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
        <Board/>
      </header>
    </div>
  );
}

export default App;

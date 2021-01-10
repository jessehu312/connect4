import './App.css';
import Game from './components/Game';
import { ConfigProvider, useConfig } from './context/ConfigProvider';

const Main = () => {
  const { config } = useConfig();

  let className = "App-header";

  if (!config) {
    className += " loading";
  }

  return (
  <header className={className}>
    <img src="logo192.png" className="App-logo" alt="logo" />
    <a
      className="App-link font-effect-fire-animation"
      href="https://jessehu.me"
      target="_blank"
      rel="noopener noreferrer"
    >
      <h1>{ config ? "Connect 4" : "Loading..."}</h1>
    </a>
    {config ? <Game/> : null}
  </header>
  );
}

function App() {
  return (
    <div className="App">
      <ConfigProvider>
        <Main/>
      </ConfigProvider>
    </div>
  );
}

export default App;

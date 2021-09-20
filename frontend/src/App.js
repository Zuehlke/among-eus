import logo from './logo.svg';
import './App.css';
import ChooseName from "./components/ChooseName/ChooseName";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
        <ChooseName/>
      </header>
    </div>
  );
}

export default App;

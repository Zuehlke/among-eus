import logo from './links/logo.png';
import './App.css';
import ChooseName from "./components/ChooseName/ChooseName";
import Lobby from "./components/Lobby/Lobby";
import ChooseGame from "./components/ChooseGame/ChooseGame";
import CreateTasks from "./components/CreateTasks/CreateTasks";

function App() {
  return (
      <div className="app-container schwarzwald-background">
          {/*<div className="logo">
          <img alt="Logo" src={logo}/>
          <p>Among Eus</p>
        </div>
    <ChooseName />*/}
            <ChooseGame/>
        {/*<Lobby/>
    <CreateTasks/>*/}
      </div>
  );
}

export default App;

import logo from './logo.svg';
import './App.css';
import ChooseName from "./components/ChooseName/ChooseName";
import Lobby from "./components/Lobby/Lobby";
import ChooseGame from "./components/ChooseGame/ChooseGame";
import CreateTasks from "./components/CreateTasks/CreateTasks";

function App() {
  return (
      <div>
    <ChooseName/>
    <ChooseGame/>
    <Lobby/>
    <CreateTasks/>
      </div>
  );
}

export default App;

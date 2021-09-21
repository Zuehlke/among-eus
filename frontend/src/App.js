import './App.css';
import ChooseName from "./components/ChooseName/ChooseName";
import Lobby from "./components/Lobby/Lobby";
import ChooseGame from "./components/ChooseGame/ChooseGame";
import CreateTasks from "./components/CreateTasks/CreateTasks";
import React from "react";

class App extends React.Component {


    constructor(props, context) {
        super(props, context);
        this.state = {
            currentView: 'ChooseName',
        };
    }

    render() {
        const currentView = this.state.currentView;
        return (
            <div>
                {currentView === 'ChooseName' && <ChooseName/>}
                {currentView === 'ChooseGame' && <ChooseGame/>}
                {currentView === 'Lobby' && <Lobby/>}
                {currentView === 'CreateTasks' && <CreateTasks/>}
            </div>
        );
    }
}

export default App;

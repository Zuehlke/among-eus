import './App.css';
import ChooseName from "./components/ChooseName/ChooseName";
import Lobby from "./components/Lobby/Lobby";
import ChooseGame from "./components/ChooseGame/ChooseGame";
import CreateTasks from "./components/CreateTasks/CreateTasks";
import React from "react";
import SocketConnection from "./components/SocketConnection/SocketConnection";

class App extends React.Component {

    constructor(props, context) {
        super(props, context);
        this.state = {
            currentView: 'ChooseName',
        };
        this.onNameChosen = this.onNameChosen.bind(this);
    }

    render() {
        const currentView = this.state.currentView;
        return (
            <div>
                {currentView === 'ChooseName' && <ChooseName onNameChosen={this.onNameChosen}/>}
                {currentView === 'ChooseGame' && <ChooseGame/>}
                {currentView === 'Lobby' && <Lobby/>}
                {currentView === 'CreateTasks' && <CreateTasks/>}
                {currentView === 'SocketConnection' && <SocketConnection/>}
            </div>
        );
    }

    onNameChosen(playerName) {
        this.setState({
            playerName,
            currentView: 'ChooseGame',
        })
    }
}

export default App;

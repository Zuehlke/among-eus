import React from 'react';
import './App.css';
import MapOverview from "./components/MapOverview/MapOverview";
import {parseGameDetails} from "./utils/game-details";
import {connect, sendMessage} from "./utils/websocket-client";


function App() {

    connect('ws:localhost:10000', () => sendMessage('test'));

    const gameDetails = parseGameDetails();
    console.info(`Detected game ${gameDetails.gameId} and user ${gameDetails.userId}`);

    return (
        <div className="App">
            <MapOverview></MapOverview>
        </div>
    );
}

export default App;

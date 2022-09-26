import React from 'react';
import './App.css';
import MapOverview from "./components/MapOverview/MapOverview";
import {parseGameDetails} from "./utils/game-details";
import {connect, subscribe} from "./utils/websocket-client";


function App() {

    connect('wss://among-eus-core.azurewebsites.net/socket/topic/positions',
        () => subscribe('/topic/positions', (message: any) => console.info(message)));

    const gameDetails = parseGameDetails();
    console.info(`Detected game ${gameDetails.gameId} and user ${gameDetails.userId}`);

    return (
        <div className="App">
            <MapOverview userId={gameDetails.userId} gameId={gameDetails.gameId}></MapOverview>
        </div>
    );
}

export default App;

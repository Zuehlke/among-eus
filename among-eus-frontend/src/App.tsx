import React from 'react';
import logo from './logo.svg';
import './App.css';
import MapOverview from "./components/MapOverview/MapOverview";
import {parseGameDetails} from "./utils/game-details";


function App() {

    const gameDetails = parseGameDetails();
    console.info(`Detected game ${gameDetails.gameId} and user ${gameDetails.userId}`);

    return (
        <div className="App">
            <MapOverview></MapOverview>
        </div>
    );
}

export default App;

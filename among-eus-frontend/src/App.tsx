import React, {createContext, useState} from 'react';
import './App.css';
import MapOverview from "./components/MapOverview/MapOverview";
import {parseGameDetails} from "./utils/game-details";
import {connect, subscribe} from "./utils/websocket-client";

export const UserContext = createContext([{}]);

function App() {
    const [players, setPlayers] = useState<any[]>([]);

    function updatePlayerDetails(message: any) {
        let playerList = JSON.parse(message.body)
        setPlayers(JSON.parse(message.body));
        console.log('check this');
        console.log({players});
    }

    connect('wss://among-eus-core.azurewebsites.net/socket',
        () => subscribe('/topic/players', (message: any) => updatePlayerDetails(message)));

    const gameDetails = parseGameDetails();
    console.info(`Detected game ${gameDetails.gameId} and user ${gameDetails.userId}`);

    return (
        <UserContext.Provider value={players}>
            <div className="App">
                <MapOverview userId={gameDetails.userId} gameId={gameDetails.gameId}></MapOverview>
            </div>
        </UserContext.Provider>
    );
}

export default App;
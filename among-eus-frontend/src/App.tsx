import React, {useCallback, useEffect, useState} from 'react';
import './App.css';
import MapOverview from "./components/MapOverview/MapOverview";
import {parseGameDetails} from "./utils/game-details";
import {connect, subscribe} from "./utils/websocket-client";

function App() {
    const [players, setPlayers] = useState<any[]>([]);
    const [gameId, setGameId] = useState<string | null>("");
    const [userId, setUserId] = useState<string | null>("");

    const updatePlayerDetails = useCallback((message: any) => {
        console.log(JSON.parse(message.body));
        setPlayers(JSON.parse(message.body));
    },[setPlayers]);

    useEffect(() => {
        connect('wss://among-eus-core.azurewebsites.net/socket',
            () => subscribe('/topic/players', (message: any) => updatePlayerDetails(message)));

        const gameDetails = parseGameDetails();
        setGameId(gameDetails.gameId);
        setUserId(gameDetails.userId);
        console.info(`Detected game ${gameDetails.gameId} and user ${gameDetails.userId}`);
    }, [setGameId, setUserId, updatePlayerDetails]);


    return (
        <div className="App">
            {gameId && userId && <MapOverview userId={userId} gameId={gameId} players={players}></MapOverview>}
        </div>
    );
}

export default App;
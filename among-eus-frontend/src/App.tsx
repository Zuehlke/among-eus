import React, {useCallback, useEffect, useState} from 'react';
import './App.css';
import MapOverview from "./components/MapOverview/MapOverview";
import {parseGameDetails} from "./utils/game-details";
import {connect, subscribe} from "./utils/websocket-client";
import {Player} from "./utils/player";
import {IMessage} from "@stomp/stompjs";
import Task from "./utils/task";

function App() {
    const [players, setPlayers] = useState<Player[]>([]);
    const [killedPlayer, setKilledPlayer] = useState<Player | null>(null);
    const [gameId, setGameId] = useState<string | null>(null);
    const [userId, setUserId] = useState<string | null>(null);
    const [tasks, setTasks] = useState<Task[]>([]);

    const updatePlayerDetails = useCallback((message: IMessage) => {
        console.debug(JSON.parse(message.body));
        setPlayers(JSON.parse(message.body));
    }, [setPlayers]);

    const updateKilledPlayer = useCallback((message: IMessage) => {
        setKilledPlayer(JSON.parse(message.body));
    },[setKilledPlayer]);

    useEffect(() => {
        const gameDetails = parseGameDetails();

        connect('wss://among-eus-core.azurewebsites.net/socket',
            () => {
                if (gameDetails.gameId) {
                    subscribe(`/topic/game/${gameDetails.gameId}/players`, (message: IMessage) => updatePlayerDetails(message));
                    subscribe(`/topic/game/${gameDetails.gameId}/players/killed`, (message: IMessage) => updateKilledPlayer(message));
                    subscribe(`/topic/game/${gameDetails.gameId}/tasks`, (message: IMessage) => {
                        const tasks: Task[] = JSON.parse(message.body);
                        console.debug('tasks', tasks);
                        setTasks(tasks);
                    });
                } else {
                    console.warn("Game id is null");
                }
            });

        setGameId(gameDetails.gameId);
        setUserId(gameDetails.userId);
        console.info(`Detected game ${gameDetails.gameId} and user ${gameDetails.userId}`);
    }, [setGameId, setUserId, updatePlayerDetails, updateKilledPlayer]);


    return (
        <div className="App">
            {gameId && userId && <MapOverview userId={userId} gameId={gameId} players={players} tasks={tasks} killedPlayer={killedPlayer}></MapOverview>}
        </div>
    );
}

export default App;
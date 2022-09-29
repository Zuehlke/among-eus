import React, {useCallback, useEffect, useState} from 'react';
import './App.css';
import MapOverview from "./components/MapOverview/MapOverview";
import {parseGameDetails} from "./utils/game-details";
import {connect, subscribe} from "./utils/websocket-client";
import {Player} from "./utils/player";
import {IMessage} from "@stomp/stompjs";
import Task from "./utils/task";
import {GameState} from "./utils/game-state";

function App() {
    const [players, setPlayers] = useState<Player[]>([]);
    const [killedPlayer, setKilledPlayer] = useState<Player | null>(null);
    const [gameId, setGameId] = useState<string | null>(null);
    const [userId, setUserId] = useState<string | null>(null);
    const [tasks, setTasks] = useState<Task[]>([]);
    const [gameState, setGameState] = useState<GameState>("WAITING_FOR_PLAYERS");

    const updatePlayerDetails = useCallback((message: IMessage) => {
        console.debug(JSON.parse(message.body));
        setPlayers(JSON.parse(message.body));
    }, [setPlayers]);

    const updateKilledPlayer = useCallback((message: IMessage) => {
        setKilledPlayer(JSON.parse(message.body));
    }, [setKilledPlayer]);

    const updateTasks = (message: IMessage) => {
        const tasks: Task[] = JSON.parse(message.body);
        console.debug('tasks', tasks);
        setTasks(tasks);
    }

    const updateGameState = (message: IMessage) => {
        const gameState: GameState = JSON.parse(message.body) as GameState;
        console.debug('gameState received', gameState);
        setGameState(gameState);
    }

    useEffect(() => {
        const gameDetails = parseGameDetails();
        setGameId(gameDetails.gameId);
        setUserId(gameDetails.userId);
        console.info(`Detected game ${gameDetails.gameId} and user ${gameDetails.userId}`);
        if (!gameDetails.gameId) return;

        connect(process.env.REACT_APP_WEBSOCKET_URL,
            () => {
                subscribe(`/topic/game/${gameDetails.gameId}/players`, updatePlayerDetails);
                subscribe(`/topic/game/${gameDetails.gameId}/players/killed`, updateKilledPlayer);
                subscribe(`/topic/game/${gameDetails.gameId}/tasks`, updateTasks);
                subscribe(`/topic/game/${gameDetails.gameId}/`, updateGameState);
            });
    }, [setGameId, setUserId, updatePlayerDetails, updateKilledPlayer]);


    if (gameId && userId) {
        return <div className="App">
            <MapOverview userId={userId}
                         gameId={gameId}
                         players={players}
                         gameState={gameState}
                         killedPlayer={killedPlayer}
                         tasks={tasks}/>

        </div>
    } else {
        return <div className="App">
            <h1>Provide game and user through query parameters.</h1>
        </div>
    }
}

export default App;
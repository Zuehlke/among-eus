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
    const [gameId, setGameId] = useState<string | null>(null);
    const [userId, setUserId] = useState<string | null>(null);
    const [tasks, setTasks] = useState<Task[]>([]);
    const [gameState, setGameState] = useState<GameState>("WAITING_FOR_PLAYERS");

    const updatePlayerDetails = useCallback((message: IMessage) => {
        console.debug(JSON.parse(message.body));
        setPlayers(JSON.parse(message.body));
    }, [setPlayers]);

    useEffect(() => {
        connect('wss://among-eus-core.azurewebsites.net/socket',
            () => {
                subscribe('/topic/players', (message: IMessage) => updatePlayerDetails(message));
                subscribe('/topic/tasks', (message: IMessage) => {
                    const tasks: Task[] = JSON.parse(message.body);
                    console.debug('tasks', tasks);
                    setTasks(tasks);
                });
                subscribe('/topic/game', (message: IMessage) => {
                    const gameState: GameState = JSON.parse(message.body) as GameState;
                    console.debug('gameState received', gameState);
                    setGameState(gameState);
                });
            });

        const gameDetails = parseGameDetails();
        setGameId(gameDetails.gameId);
        setUserId(gameDetails.userId);
        console.info(`Detected game ${gameDetails.gameId} and user ${gameDetails.userId}`);
    }, [setGameId, setUserId, updatePlayerDetails]);


    return (
        <div className="App">
            {gameId && userId && <MapOverview userId={userId}
                                              gameId={gameId}
                                              players={players}
                                              gameState={gameState}
                                              tasks={tasks}/>
            }
        </div>
    );
}

export default App;
import React, {useState} from 'react';
import './Lobby.css';
import {Client, Message} from "@stomp/stompjs";

interface Pair {
    [key: string]: number;
}

interface LobbyWithPlayers {
    gameId: string;
    playerIdTaskCountPairs: Array<Pair>;
}

interface LobbyProps {
    lobby?: LobbyWithPlayers;
    isHost: boolean;
    numberOfTasks: number;
    gameId: string;
    playerId: string;
    client?: Client;
}

const Lobby = (props: LobbyProps) => {
    const [lobby, setLobby] = useState<LobbyWithPlayers>();

    const isPending = (props: LobbyProps): boolean => {
        return lobby?.playerIdTaskCountPairs.some(player => player.tasksCreated < props.numberOfTasks) as boolean;
    }

    const onLobbyJoin = (gameId: string, playerId: string) => {
        props.client?.publish({
            destination: '/join',
            body: JSON.stringify({
                playerId,
                gameId,
            })
        });
        props.client?.subscribe('/getLobby/' + gameId, onLobbyReceived)
    }

    const onLobbyReceived = (message: Message) => {
        const lobby: LobbyWithPlayers = JSON.parse(message.body);
        setLobby(lobby);
    }

    const useInitialize = (callBack = () => {
    }) => {
        const [hasBeenCalled, setHasBeenCalled] = useState(false);
        if (hasBeenCalled) return;
        callBack();
        setHasBeenCalled(true);
    }

    useInitialize(() => {
        onLobbyJoin(props.gameId, props.playerId);
    });
    return (
        <div className="Lobby">
            Lobby Component
            <table>
                <thead>
                <tr>
                    <th>id</th>
                    <th>tasks created</th>
                </tr>
                </thead>
                <tbody>
                {lobby?.playerIdTaskCountPairs.map((player: Pair, index: number) => (
                    <tr key={index}>
                        <td>{player.first}</td>
                        <td>{player.second}/{props.numberOfTasks}</td>
                    </tr>
                ))}
                </tbody>
            </table>
            {<button hidden={!props.isHost} disabled={isPending(props)} id="btnStart"
                     onClick={() => console.log("start game")}>Start game</button>}

        </div>
    );

}

export default Lobby;

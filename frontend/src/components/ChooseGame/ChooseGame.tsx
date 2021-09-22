import React, {useState} from 'react';
import './ChooseGame.css';

export interface Game {
    gameId: string;
    name: string;
    ownerId?: string;
}

const ChooseGame = (props: any) => {
    const [selectedGameId, setSelectedGameId] = useState("");
    const [selectedRowStyle, setSelectedRowStyle] = useState("");

    function selectGameId(id: string) {
        setSelectedGameId(id);
        setSelectedRowStyle("selected-row");
    }

    return (
        <div className="ChooseGame">
            <button id="btnHostGame" onClick={props.onHostGame}>Host New Game</button>
            <hr/>
            <div className="flex-container">
                <table>
                    <tbody>
                    {props.games.map((game: Game) => {
                        return <tr className={selectedGameId === game.gameId ? selectedRowStyle : ''} key={game.gameId}
                                   onClick={() => selectGameId(game.gameId)}>
                            <td>{game.name}</td>
                        </tr>
                    })}
                    </tbody>
                </table>
                <button hidden={!selectedGameId} id="btnJoinGame" onClick={() => props.onLobbyJoin(selectedGameId)}>Join
                    Game
                </button>
            </div>
        </div>
    );
}

export default ChooseGame;

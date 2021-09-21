import React from 'react';
import './ChooseGame.css';

interface Game {
    id: number;
    name: string;
}

const games: Game[] = [
    {id: 1, name: "Game Steffi"},
    {id: 2, name: "Game Dani"},
    {id: 3, name: "Game Nicolas"}
];

let selectedGameId: number;
function selectGameId(id: number){
    selectedGameId = id;
}

const ChooseGame = () => (
        <div className="ChooseGame">
            <button id="btnHostGame" onClick={() => console.log("Host Game")}>Host New Game</button>
            <hr/>
            <div className="flex-container">
                <table>
                    <tbody>
                    {games.map(game => {
                        return <tr key={game.id} onClick={() => selectGameId(game.id)}>
                            <td>{game.name}</td>
                        </tr>
                    })}
                    </tbody>
                </table>
                <button id="btnJoinGame" onClick={() => console.log(selectedGameId)}>Join Game</button>
            </div>
        </div>
    );

export default ChooseGame;

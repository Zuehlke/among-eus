import React from 'react';
import './ChooseGame.css';

const games = [
    "Game Steffi",
    "Game Dani",
    "Game Nicolas"
];

const ChooseGame = () => (
    <div className="ChooseGame">
        <button id="btnHostGame" onClick={() => console.log("Host Game")}>Host New Game</button>
        <hr/>
        <div className="flex-container">
            <table>
                <tbody>
                {games.map(game => {
                    return <tr key={game}>
                        <td>{game}</td>
                    </tr>
                })}
                </tbody>
            </table>
            <button id="btnJoinGame" onClick={() => console.log("Join Game")}>Join Game</button>
        </div>
    </div>
);

export default ChooseGame;

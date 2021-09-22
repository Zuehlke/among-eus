import React, {useState} from 'react';
import './ChooseGame.css';
import logo from "../../links/logo.png";

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
        setSelectedRowStyle("selected-tr");
    }

    return (
        <div className="ChooseGame">
            <div className="flex-container full-height flex-flow-column">
                <div className="header flex-container flex-flow-row">
                    <img alt="Logo" src={logo}/>
                </div>
                <div className="component-element-container flex-grow">
                    <div className="flex-container align-items-center">
                        <button id="btnHostGame" onClick={props.onHostGame}>Host New Game</button>
                    </div>
                </div>
                {props.games.length > 0 &&
                <div className="component-element-container flex-grow overflow-hidden">
                    <div className="height-100-percent flex-container flex-flow-row">
                        {/*TODO make table scrollable */}
                        <div className="flex-container align-items-center scroll">
                            <table className="margin-left">
                                <tbody>
                                {props.games.map((game: Game) => {
                                    return <tr className={selectedGameId === game.gameId ? selectedRowStyle : ''}
                                               key={game.gameId}
                                               onClick={() => selectGameId(game.gameId)}>
                                        <td>{game.name}</td>
                                    </tr>
                                })}
                                </tbody>
                            </table>
                        </div>
                        <div className="flex-container align-items-center flex-grow">
                            <button hidden={!selectedGameId} id="btnJoinGame"
                                    onClick={() => console.log(selectedGameId)}>
                                Join Game
                            </button>
                        </div>
                    </div>
                </div>
                }
            </div>
        </div>
    );
}

export default ChooseGame;

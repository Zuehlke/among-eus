import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCheck, faUser} from "@fortawesome/free-solid-svg-icons";
import React, {FC} from "react";
import {Player} from "../../../utils/player";
import Task from "../../../utils/task";
import {GameState} from "../../../utils/game-state";
import {Role} from "../../../utils/role";
import './Banner.css';

interface GameInfoBannerProps {
    players: Player[];
    tasks: Task[];
    gameState: GameState;
    winner: Role | null;
}

const GameInfoBanner: FC<GameInfoBannerProps> = (props) => {

    let banner;
    if (props.gameState === "WAITING_FOR_PLAYERS") {
        banner = (
            <>
                <span className={"non-wrapping-element"}><FontAwesomeIcon icon={faUser}/> {props.players.length} Spieler </span>
                - <span className={"non-wrapping-element"}><FontAwesomeIcon icon={faCheck}/> {props.tasks.length} Üfgob(e)</span>
            </>
        );
    } else if (props.winner === Role.AGENT || props.winner === Role.TERRORIST) {
        banner = (
            <>
                <span className={"non-wrapping-element"}><FontAwesomeIcon icon={faCheck}/> <b>SPIEL ISCH VERBI!</b></span><br/>
                {
                    props.winner === Role.TERRORIST ? (
                        <span className={"non-wrapping-element"}><FontAwesomeIcon icon={faUser} color={"red"}/> D Walliser hei gegwunne!</span>
                    ) : (
                        <span className={"non-wrapping-element"}><FontAwesomeIcon icon={faUser}/> D Üsserschwizer hei gegwunne!</span>
                    )
                }
            </>
        );

    } else {
            banner = (
                <>
                    <span className={"non-wrapping-element"}><FontAwesomeIcon icon={faUser} color={"red"}/> {getAmountOfTerrorists(props.players)} Walliser </span>
                    - <span className={"non-wrapping-element"}><FontAwesomeIcon icon={faUser}/>{getAmountOfAliveAgents(props.players)}/{getAmountOfAgents(props.players)} Üsserschwizer</span>
                    - <span className={"non-wrapping-element"}><FontAwesomeIcon icon={faCheck}/> {getAmountOfTasksCompleted(props.tasks)} / {props.tasks.length} Üfgobe</span>
                </>
            );
    }
    return (
        <div className="numberOfPlayers">
            {banner}
        </div>
    )
}

function getAmountOfTasksCompleted(tasks: Task[]) : number {
    return tasks.filter((task) => task.completed).length;
}

function getAmountOfAliveAgents(players: Player[]): number {
    return players.filter((player) => player.alive && player.role === Role.AGENT).length;
}

function getAmountOfAgents(players: Player[]): number {
    return players.filter((player) => player.role === Role.AGENT).length;
}

export function getAmountOfTerrorists(players: Player[]): number {
    return players.filter((player) => player.alive && player.role === Role.TERRORIST).length;
}

export default GameInfoBanner;
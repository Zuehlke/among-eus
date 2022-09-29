import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCheck, faUser} from "@fortawesome/free-solid-svg-icons";
import React, {FC} from "react";
import {Player} from "../../../utils/player";
import Task from "../../../utils/task";
import {GameState} from "../../../utils/game-state";
import {Role} from "../../../utils/role";

interface GameInfoBannerProps {
    players: Player[];
    tasks: Task[];
    gameState: GameState;
}

const GameInfoBanner: FC<GameInfoBannerProps> = (props) => {

    let banner;
    if (props.gameState === "WAITING_FOR_PLAYERS") {
        banner = (
            <>
                <FontAwesomeIcon icon={faUser}/> {props.players.length} Players
                - <FontAwesomeIcon icon={faCheck}/>
                {props.tasks.length} Task(s)
            </>
        );
    } else {
        banner = (
            <>
                <FontAwesomeIcon icon={faUser} color={"red"}/> {getAmountOfTerrorists(props.players)} Terrorists -
                <FontAwesomeIcon icon={faUser}/>{getAmountOfAliveAgents(props.players)}/{getAmountOfAgents(props.players)} Agents
                - <FontAwesomeIcon icon={faCheck}/>
                {getAmountOfTasksCompleted(props.tasks)} / {props.tasks.length} Task(s)
            </>
        );
    }
    return (
        <div className="numberOfPlayer">
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
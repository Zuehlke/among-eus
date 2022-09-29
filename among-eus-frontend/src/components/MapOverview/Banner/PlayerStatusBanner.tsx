import React from "react";
import {Role} from "../../../utils/role";
import './Banner.css';
import GameInfoBanner from "./GameInfoBanner";
import {GameState} from "../../../utils/game-state";
import {Player} from "../../../utils/player";
import Task from "../../../utils/task";

interface PlayerStatusBannerProps {
    userId: string;
    isAlive: boolean | undefined;
    role: Role | null;
}

export function PlayerStatusBanner(props: PlayerStatusBannerProps) {
    return (
        <div>
            <h3 className="sub-title">{props.userId} -
                {
                    props.isAlive ? <b> {props.role}</b> : <b> dü bisch tot</b>
                }
            </h3>
        </div>
    )
}
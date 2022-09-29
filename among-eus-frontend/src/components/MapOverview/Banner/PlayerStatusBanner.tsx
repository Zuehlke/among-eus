import React from "react";
import {Role} from "../../../utils/role";
import './Banner.css';

interface PlayerStatusBannerProps {
    gameId: string;
    userId: string;
    isAlive: boolean | undefined;
    role: Role | null;
}

export function PlayerStatusBanner(props: PlayerStatusBannerProps) {
    return (
        <div>
            <h2 className="title">Among Isch - {props.gameId}</h2>
            <h3 className="sub-title">{props.userId} -
                {
                    props.isAlive ? <b> {props.role}</b> : <b> dü bisch tot</b>
                }
            </h3>
        </div>
    )
}
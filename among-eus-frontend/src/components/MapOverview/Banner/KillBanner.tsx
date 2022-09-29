import React from "react";
import './Banner.css';

export interface KillBannerProps {
    username: string;
    distance: string;
    onKill: () => void
}

export function KillBanner(props: KillBannerProps) {
    return (
        <div className="action-bar">
            <div className="action-bar-child">{props.username} ({props.distance} Meter)</div>
            <div className="action-bar-child">
                <button className="kill-action-button" onClick={props.onKill}>umtue</button>
            </div>
        </div>
    );
}
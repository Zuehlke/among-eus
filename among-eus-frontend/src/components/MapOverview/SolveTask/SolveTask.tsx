import React from "react";

export interface SolveTaskProps {
    taskId: string;
    distance: number;
    onSolve: () => void
}

export function SolveTask(props: SolveTaskProps) {

    return (
        <div className="action-bar">
            <div className="action-bar-child">Üfgab {props.taskId} ({props.distance} Meter)</div>
            <div className="action-bar-child">
                <button className="kill-action-button" onClick={props.onSolve}>lösu</button>
            </div>
        </div>
    );
}
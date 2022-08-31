import React from 'react';
import './SolveTask.css';
import CreateTask from "../CreateTasks/CreateTask";

const SolveTask = () => (
    <div className="SolveTask">
        <CreateTask taskIndex={1} onChange={onChange}/>
        <div>
            <button onClick={solveTask}>Solve task</button>
        </div>
    </div>
);

function onChange() {

}

function solveTask() {

}

export default SolveTask;

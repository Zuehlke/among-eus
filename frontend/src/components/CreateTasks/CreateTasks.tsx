import React from 'react';
import './CreateTasks.css';
import CreateTask from "./CreateTask";

const CreateTasks = () => (
    <div className="CreateTasks">
        <div>Go to a location and take a picture for others to find.</div>
        {[1, 2].map(taskIndex => {
            return <CreateTask key={taskIndex} taskIndex={taskIndex}/>
        })}:

    </div>
);

export default CreateTasks;

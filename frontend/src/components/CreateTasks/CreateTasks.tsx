import React, {ChangeEvent} from 'react';
import './CreateTasks.css';
import emptyImage from './empty.jpeg';

const CreateTasks = () => (
    <div className="CreateTasks">
        <div>Go to a location and take a picture for others to find.</div>
        {[1, 2].map(taskIndex => {
            return <div key={taskIndex}>
                <div>Task {taskIndex}</div>
                <div>
                    <div>
                        <input type="file" accept="image/*"
                               onChange={(event) => {
                                   onPhotoUpload(event, taskIndex)
                               }}/>
                    </div>
                    <div>
                        <img id={'taskImage' + taskIndex} src={emptyImage} alt={'Task ' + taskIndex} width="200"/>
                    </div>
                </div>
            </div>
        })}:

    </div>
);

function onPhotoUpload(event: ChangeEvent<HTMLInputElement>, taskIndex: number) {
    // @ts-ignore
    const file = event.target.files[0];
    // @ts-ignore
    document.getElementById('taskImage' + taskIndex).src = URL.createObjectURL(file);
}

export default CreateTasks;

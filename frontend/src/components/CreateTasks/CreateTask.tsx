import React, {ChangeEvent} from "react";
import emptyImage from "./empty.jpeg";

const CreateTask = (props: any) => (
    <div key={props.taskIndex}>
        <div>Task {props.taskIndex}</div>
        <div>
            <div>
                <input type="file" accept="image/*"
                       onChange={(event) => {
                           onPhotoUpload(event, props.taskIndex)
                       }}/>
            </div>
            <div>
                <img id={'taskImage' + props.taskIndex} src={emptyImage} alt={'Task ' + props.taskIndex} width="200"/>
            </div>
        </div>
    </div>

);

function onPhotoUpload(event: ChangeEvent<HTMLInputElement>, taskIndex: number) {
    // @ts-ignore
    const file = event.target.files[0];
    // @ts-ignore
    document.getElementById('taskImage' + taskIndex).src = URL.createObjectURL(file);
}

export default CreateTask;
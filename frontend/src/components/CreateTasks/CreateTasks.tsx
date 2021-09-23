import React from 'react';
import './CreateTasks.css';
import CreateTask, {Task} from "./CreateTask";
import Header from "../Header/Header";

class CreateTasks extends React.Component<any, any> {

    constructor(props: any) {
        super(props);
        this.state = {
            tasks: [{
                index: 1,
            }, {
                index: 2,
            }],
        }
        this.onTaskChanged = this.onTaskChanged.bind(this);
        this.onCreateTasks = this.onCreateTasks.bind(this);
    }

    render() {
        return (
            <div className="CreateTasks flex-container flex-flow-column full-height">
                <Header/>
                <div className="component-element-container flex-container flex-flow-column height-100-percent">
                    <div className="flex-container flex-flow-row align-items-center">
                        <div className="info-icon">&#9432;</div>
                        <div>Go to a location and take a picture for others to find</div>
                    </div>
                    <div className="flex">
                        {this.state.tasks.map((task: any) => {
                            return <CreateTask key={task.index}
                                               onChange={this.onTaskChanged}
                                               taskIndex={task.index}/>
                        })}
                    </div>
                    <div className="button-container center">
                        <button onClick={this.onCreateTasks}>Create tasks</button>
                    </div>
                </div>
            </div>
        );
    }

    onCreateTasks() {
        console.log('create tasks ', this.state.tasks);
    }

    onTaskChanged(updatedTask: Task) {
        const tasks = this.state.tasks;
        const newTasks = tasks.map((task: any) => {
            if (task.index === updatedTask.index) {
                return updatedTask;
            }
            return task;
        });
        this.setState({tasks: newTasks})
    }
}

export default CreateTasks;

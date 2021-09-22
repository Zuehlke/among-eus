import React from 'react';
import './CreateTasks.css';
import CreateTask, {Task} from "./CreateTask";

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
            <div className="CreateTasks">
                <div>Go to a location and take a picture for others to find.</div>
                {this.state.tasks.map((task: any) => {
                    return <CreateTask key={task.index}
                                       onChange={this.onTaskChanged}
                                       taskIndex={task.index}/>
                })}

                <button className="btnCreateTasks" onClick={this.onCreateTasks}>Create tasks</button>
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

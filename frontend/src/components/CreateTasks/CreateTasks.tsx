import React from 'react';
import './CreateTasks.css';
import CreateTask, {Task} from "./CreateTask";
import {createClient} from "../../websocket-helper";
import {Message} from "@stomp/stompjs";

interface CreateTasksProps {
    playerId: string;
    gameId: string;
    onTasksCreated: () => void;
}

interface CreateTasksState {
    tasks: Partial<Task>[];
    createPossible: boolean;
}

class CreateTasks extends React.Component<CreateTasksProps, CreateTasksState> {

    constructor(props: CreateTasksProps) {
        super(props);
        this.state = {
            tasks: [{
                index: 1,
            }, {
                index: 2,
            }],
            createPossible: false,
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

                <button disabled={!this.state.createPossible} className="btnCreateTasks"
                        onClick={this.onCreateTasks}>Create tasks
                </button>
            </div>
        );
    }

    onCreateTasks() {
        console.log('create tasks ', this.state.tasks);
        const client = createClient(process.env.REACT_APP_WS_TASKS_URL as string);

        client.onConnect = (() => {
            client.subscribe('/user/create', (message: Message) => {
                console.log('received data', message.body);
            });

            this.state.tasks.forEach(task => {
                client.publish({
                    destination: '/create',
                    body: JSON.stringify({
                        long: task.longitude,
                        lat: task.latitude,
                        imgBase64: task.imageSrc,
                        creatorId: this.props.playerId,
                        gameId: this.props.gameId,
                    }),
                });
            });

            client.deactivate().then(() => this.props.onTasksCreated());
        });

        client.activate();
    }

    onTaskChanged(updatedTask: Task) {
        const tasks = this.state.tasks;
        const newTasks: Task[] = tasks.map((task: any) => {
            if (task.index === updatedTask.index) {
                return updatedTask;
            }
            return task;
        });
        const createPossible = newTasks.every(task => task.imageSrc);
        this.setState({
            tasks: newTasks,
            createPossible,
        })
    }
}

export default CreateTasks;

import React, {ChangeEvent} from "react";
import emptyImage from "./empty.jpeg";

export interface Task {
    index: number;
    imageSrc: string;
    latitude: number;
    longitude: number;
}

interface CreateTaskProps {
    taskIndex: number;
    onChange: (task: Task) => void;
}

class CreateTask extends React.Component<CreateTaskProps, any> {

    private watchId?: number;

    constructor(props: CreateTaskProps) {
        super(props);
        this.state = {
            imageSrc: emptyImage,
        }
    }

    render() {
        const taskIndex: number = this.props.taskIndex;

        return <div key={taskIndex}>
            <h2>Task {taskIndex}</h2>
            <div>
                <div>
                    <input type="file" accept="image/*"
                           onChange={(event) => {
                               this.onPhotoUpload(event)
                           }}/>
                </div>
                <div>
                    <img id={'taskImage' + taskIndex}
                         src={this.state.imageSrc}
                         alt={'Task ' + taskIndex}
                    />
                </div>
                <div>
                    Latitude: {this.state.latitude} Longitude: {this.state.longitude}
                </div>
            </div>
        </div>;
    }

    componentDidMount() {
        if ("geolocation" in navigator) {
            const options = {
                enableHighAccuracy: true,
                timeout: 15000,
                maximumAge: 0
            };

            this.watchId = navigator.geolocation.watchPosition((position => {
                this.setState({
                    latitude: position.coords.latitude,
                    longitude: position.coords.longitude,
                })
            }), (error) => {
                console.error(error.code + " " + error.message)
            }, options);
        } else {
            console.error("Geolocation not available");
        }
    }

    componentWillUnmount() {
        if (this.watchId) {
            navigator.geolocation.clearWatch(this.watchId);
        }
    }

    private onPhotoUpload(event: ChangeEvent<HTMLInputElement>) {
        // @ts-ignore
        const file = event.target.files[0];
        this.setState({
            imageSrc: URL.createObjectURL(file),
        });
        this.fireChanged();
    }

    private fireChanged() {
        this.props.onChange({
            index: this.props.taskIndex,
            imageSrc: this.state.imageSrc,
            latitude: this.state.latitude,
            longitude: this.state.longitude,
        } as Task);
    }
}

export default CreateTask;
import {GoogleApiWrapper, InfoWindow, Marker, Map} from 'google-maps-react';
import React from 'react';
import './TasksMap.css';

const TasksMap = (props: any) => {
    const mapStyles = {
        width: '100%',
        height: '100%'
    };

    const renderMarkers = (map: any, maps: any) => {
        props.tasks.map((task: { id: any; }) => {
            console.debug(task.id);
        });
        const marker = new new maps.Marker({
            position: {"lat": props.tasks[0].lat, "long": props.tasks[0].long},
            map: map,
        });

    }

    return (
        <div className="TasksMap">
            <Map
                google={props.google}
                style={mapStyles}
                initialCenter={
                    {
                        lat: 46.670157642456424,
                        lng: 7.287877789507476
                    }
                }
                children={
                    <Marker mapCenter={ {"lat": props.tasks[0].lat, "lng": props.tasks[0].long} } />

                }
            />
        </div>
    );
};

TasksMap.defaultProps = {
    playerId: "42",
    tasks: [
        {"taskId": 1, "lat": 46.670157642456424, "long": 7.287877789507476, "imgBase64": "asdf123", "gameId": 1},
        {"taskId": 2, "lat": 46.66834531462181, "long": 7.280936998091193, "imgBase64": "asdf123", "gameId": 1},
        {"taskId": 3, "lat": 46.67101563154103, "long": 7.285364304380624, "imgBase64": "asdf123", "gameId": 1}
    ]
};

export default GoogleApiWrapper({
    // @ts-ignore
    apiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY
})(TasksMap);

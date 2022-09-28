import {FC, useEffect, useState} from "react";

export enum MarkerTypes {
    PLAYER, OPPONENT, TASK
}

interface MarkerProps extends google.maps.MarkerOptions {
    labelName: string,
    labelType: MarkerTypes,
}

const Marker: FC<MarkerProps> = ({labelName, labelType, ...options}) => {
    const [marker, setMarker] = useState<google.maps.Marker>();

    useEffect(() => {
        if (!marker) {
            setMarker(new google.maps.Marker());
        }

        // remove marker from map on unmount
        return () => {
            if (marker) {
                marker.setMap(null);
            }
        };
    }, [marker]);

    useEffect(() => {
        if (marker) {
            marker.setOptions({
                ...options,
                // Use blue dot
                icon: {
                    path: google.maps.SymbolPath.CIRCLE,
                    scale: 13,
                    fillOpacity: 1,
                    strokeWeight: 2,
                    fillColor: getColor(labelType),
                    strokeColor: '#ffffff',
                },
                label: {
                    text: labelName,
                    color: 'white',
                    fontWeight: 'bold',
                }

            });
        }
    }, [marker, options, labelName, labelType]);

    return null;
};

function getColor(markerType: MarkerTypes): string {
    if (markerType === MarkerTypes.OPPONENT) {
        return 'orange';
    } else if (markerType === MarkerTypes.PLAYER) {
        return '#5384ED';
    } else if (markerType === MarkerTypes.TASK) {
        return 'red';
    }
    console.warn('Got unexpected type ' + markerType)
    return 'white';
}

export default Marker;
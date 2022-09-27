const callbacks: Array<(position: GeolocationPosition) => void> = [];

export function startGpsTracking2(): number {
    let latitude = 0;
    let longitude = 0;
    let accuracy = 0;
    if ("geolocation" in navigator) {
        const options = {
            enableHighAccuracy: true,
            timeout: 15000,
            maximumAge: 0
        };

        return navigator.geolocation.watchPosition((position => {
            console.info(`GPS latitude ${position.coords.latitude} longitude ${position.coords.longitude} accuracy ${position.coords.accuracy}`);
            if (latitude !== position.coords.latitude || longitude !== position.coords.longitude || accuracy !== position.coords.accuracy) {
                callbacks.forEach(callback => callback(position))
            }

            latitude = position.coords.latitude;
            longitude = position.coords.longitude;
            accuracy = position.coords.accuracy;
        }), (error) => {
            console.error(error.code + " " + error.message)
        }, options);
    } else {
        console.error("Geolocation not available");
    }
    return -1;
}

export function registerCallback(callback: (position: GeolocationPosition) => void): void {
    callbacks.push(callback);
}
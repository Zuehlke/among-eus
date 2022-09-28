import {Player} from "./player";

const RADIUS_OF_WORLD_IN_METER = 6_371_000;

export function findNearestAlivePlayer(players: Player[], me: Player): Player | null {
    let closestPlayer = null;
    let minDistance = Number.MAX_SAFE_INTEGER;

    players.forEach((player) => {
        if (player.username !== me.username) {
            const distance = getDistanceInMeter(me, player);
            if (distance < minDistance && player.alive && me.alive) {
                closestPlayer = player;
                minDistance = distance;
            }
        }
    });

    return closestPlayer;
}

export function getDistanceInMeter(p1: Player, p2: Player): number {
    const dLat: number = deg2rad(p1.latitude - p2.latitude);
    const dLon: number = deg2rad(p1.longitude - p2.longitude);
    const a = Math.sin(dLat/2) * Math.sin(dLat/2) +
        Math.cos(deg2rad(p1.latitude)) * Math.cos(deg2rad(p2.latitude)) *
        Math.sin(dLon/2) * Math.sin(dLon/2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    return RADIUS_OF_WORLD_IN_METER * c;
}

function deg2rad(deg: number): number {
    return deg * (Math.PI/180);
}

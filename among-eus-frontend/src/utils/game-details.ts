export interface GameDetails {
    userId: string | null;
    gameId: string | null;
}

export function parseGameDetails(): GameDetails {
    const params = new URLSearchParams(window.location.search);
    const gameId = params.get("game");
    const userId = params.get("user");
    return {
        gameId,
        userId,
    }
}
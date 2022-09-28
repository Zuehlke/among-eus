package com.zuehlke.amongeus.core.player;

public class PlayerReadyMessage {

    private String gameId;

    private int numberOfTerrorists;

    public String getGameId() {
        return gameId;
    }

    public void setGameId(String gameId) {
        this.gameId = gameId;
    }

    public int getNumberOfTerrorists() {
        return numberOfTerrorists;
    }

    public void setNumberOfTerrorists(int numberOfTerrorists) {
        this.numberOfTerrorists = numberOfTerrorists;
    }
}

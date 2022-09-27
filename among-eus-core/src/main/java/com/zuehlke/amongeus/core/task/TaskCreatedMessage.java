package com.zuehlke.amongeus.core.task;

import com.zuehlke.amongeus.core.model.Task;

public class TaskCreatedMessage {

    private String gameId;

    private double longitude;

    private double latitude;

    public String getGameId() {
        return gameId;
    }

    public void setGameId(String gameId) {
        this.gameId = gameId;
    }

    public double getLongitude() {
        return longitude;
    }

    public void setLongitude(double longitude) {
        this.longitude = longitude;
    }

    public double getLatitude() {
        return latitude;
    }

    public void setLatitude(double latitude) {
        this.latitude = latitude;
    }

    public Task createTask() {
        return new Task(gameId, longitude, latitude, false);
    }
}

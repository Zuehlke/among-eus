package com.zuehlke.amongeus.core.model;

public class Task {

    private String id;

    private double longitude;

    private double latitude;

    private boolean completed;

    public Task() {
    }

    public Task(String id, double longitude, double latitude, boolean completed) {
        this.id = id;
        this.longitude = longitude;
        this.latitude = latitude;
        this.completed = completed;
    }

    public String getId() {
        return id;
    }

    public double getLongitude() {
        return longitude;
    }

    public double getLatitude() {
        return latitude;
    }

    public boolean isCompleted() {
        return completed;
    }

    public void setId(String id) {
        this.id = id;
    }

    public void setLongitude(double longitude) {
        this.longitude = longitude;
    }

    public void setLatitude(double latitude) {
        this.latitude = latitude;
    }

    public void setCompleted(boolean completed) {
        this.completed = completed;
    }
}

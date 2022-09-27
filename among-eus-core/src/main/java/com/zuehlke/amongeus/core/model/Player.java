package com.zuehlke.amongeus.core.model;

public class Player {

    private String username;

    private double longitude;

    private double latitude;

    private double accuracy;

    private boolean alive = true;

    private PlayerRole role = PlayerRole.UNASSIGNED;

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
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

    public double getAccuracy() {
        return accuracy;
    }

    public void setAccuracy(double accuracy) {
        this.accuracy = accuracy;
    }

    public boolean isAlive() {
        return alive;
    }

    public void setAlive(boolean alive) {
        this.alive = alive;
    }

    public PlayerRole getRole() {
        return role;
    }

    public void setRole(PlayerRole role) {
        this.role = role;
    }

    @Override
    public String toString() {
        return "Player{" +
                "username='" + username + '\'' +
                ", longitude=" + longitude +
                ", latitude=" + latitude +
                ", accuracy=" + accuracy +
                ", alive=" + alive +
                ", role=" + role +
                '}';
    }
}

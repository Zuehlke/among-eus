package com.zuehlke.amongeus.core.task;

public class TaskCompletedMessage {

    private String gameId;

    private String taskId;

    public String getGameId() {
        return gameId;
    }

    public String getTaskId() {
        return taskId;
    }

    public void setGameId(String gameId) {
        this.gameId = gameId;
    }

    public void setTaskId(String taskId) {
        this.taskId = taskId;
    }
}

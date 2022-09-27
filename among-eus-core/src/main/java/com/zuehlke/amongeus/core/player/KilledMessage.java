package com.zuehlke.amongeus.core.player;

import com.zuehlke.amongeus.core.model.Player;

public class KilledMessage {

    private String gameId;
    private String killerId;
    private String KilledId;

    public String getKillerId() {
        return killerId;
    }

    public void setKillerId(String killerId) {
        this.killerId = killerId;
    }

    public String getKilledId() {
        return KilledId;
    }

    public void setKilledId(String killedId) {
        KilledId = killedId;
    }

    public void setGameId(String gameId) {
        this.gameId = gameId;
    }

    public String getGameId() {
        return gameId;
    }
}

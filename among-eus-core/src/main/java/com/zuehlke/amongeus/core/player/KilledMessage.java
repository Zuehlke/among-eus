package com.zuehlke.amongeus.core.player;

public class KilledMessage {

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

    @Override
    public String toString() {
        return "KilledMessage{" +
                "killerId='" + killerId + '\'' +
                ", KilledId='" + KilledId + '\'' +
                '}';
    }
}

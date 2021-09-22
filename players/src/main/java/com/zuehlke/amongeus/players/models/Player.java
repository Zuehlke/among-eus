package com.zuehlke.amongeus.players.models;
import java.util.UUID;

public class Player {

  public final String id;
  private String gameId;
  private final String name;
  private boolean isLiving;
  private boolean isImposter;
  private float longValue;
  private float latValue;

  public Player(String name) {
    this.name = name;
    this.id = UUID.randomUUID().toString();
    this.isLiving = true;
  }
}

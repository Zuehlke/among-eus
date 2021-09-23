package com.zuehlke.amongeus.players.kafka;

import com.zuehlke.amongeus.players.models.Player;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.autoconfigure.kafka.KafkaProperties;
import org.springframework.kafka.core.KafkaTemplate;
import org.springframework.stereotype.Component;

@Component
public class PlayerTopicProducer {

  private KafkaTemplate<String, Object> kafkaTemplate;

  @Autowired
  public PlayerTopicProducer(KafkaTemplate<String, Object> kafkaTemplate) {
    this.kafkaTemplate = kafkaTemplate;
  }

  public void create(Player player) {
    kafkaTemplate.send("player", player);
  }

  public void create(String playerId) {
    Player player = new Player(playerId);
    kafkaTemplate.send("player", player);
  }


}
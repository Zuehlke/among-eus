package com.zuehlke.amongeus.players.kafka;

import com.zuehlke.amongeus.players.models.Game;
import com.zuehlke.amongeus.players.services.PlayerService;
import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@Service
@RestController
public class GameTopicListener {

  private PlayerService playerService;

  public  GameTopicListener(PlayerService playerService) {

    this.playerService = playerService;
  }

  @PostMapping("/startGame")
  public void startGame(@RequestBody Game game) {
    consume(game);
  }

  @KafkaListener(topics = "game", groupId = "player_servicer" )
  public void consume(Game game) {
    playerService.gameStarted(game);
  }

}

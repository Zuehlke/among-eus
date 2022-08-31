package com.zuehlke.amongeus.players.kafka

import com.fasterxml.jackson.databind.ObjectMapper
import com.zuehlke.amongeus.players.events.PlayerKilledEvent
import org.springframework.kafka.core.KafkaTemplate
import org.springframework.stereotype.Service

@Service
class PlayerKilledEventProducer(val kafkaTemplate: KafkaTemplate<String, String>, val objectMapper : ObjectMapper) {

    fun playerKilled(gameId: String, playerId: String) {

        val playerKilled = PlayerKilledEvent(playerId, gameId);
        val eventString = objectMapper.writeValueAsString(playerKilled);

        kafkaTemplate.send("player_killed", eventString);

    }
}

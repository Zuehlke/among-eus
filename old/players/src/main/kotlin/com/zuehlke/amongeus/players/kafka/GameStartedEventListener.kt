package com.zuehlke.amongeus.players.kafka

import com.fasterxml.jackson.databind.ObjectMapper
import com.fasterxml.jackson.module.kotlin.readValue
import com.zuehlke.amongeus.players.events.GameStartedEvent
import com.zuehlke.amongeus.players.stores.PlayerStore
import org.springframework.kafka.annotation.KafkaListener
import org.springframework.stereotype.Service

@Service
class GameStartedEventListener(val objectMapper: ObjectMapper) {

    @KafkaListener(topics = ["game-start"], groupId = "player_service" )
    fun gameStartedEventHandler(event : String) {

        val eventObject :GameStartedEvent = objectMapper.readValue(event);

        eventObject.playerIds.forEach{
            var player = PlayerStore.getPlayer(it)!!
            player.gameId = eventObject.gameId;
            PlayerStore.saveOrUpdatePlayer(player)
        }

    }
}

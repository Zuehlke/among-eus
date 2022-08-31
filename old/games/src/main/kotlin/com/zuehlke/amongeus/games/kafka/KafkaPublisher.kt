package com.zuehlke.amongeus.games.kafka

import com.zuehlke.amongeus.games.event.GameStartEvent
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.kafka.core.KafkaTemplate
import org.springframework.stereotype.Service

@Service
class KafkaPublisher {

    @Autowired
    constructor(kafkaTemplate: KafkaTemplate<String, GameStartEvent>?) {
        this.kafkaTemplate = kafkaTemplate
    }

    private var kafkaTemplate: KafkaTemplate<String, GameStartEvent>? = null;

    fun sendGameStarted(gameStartEvent: GameStartEvent) {
        println(gameStartEvent)
        kafkaTemplate?.send("game-start", gameStartEvent)
    }
}
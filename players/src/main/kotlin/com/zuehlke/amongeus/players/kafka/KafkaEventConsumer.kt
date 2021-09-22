package com.zuehlke.amongeus.players.kafka

import org.springframework.kafka.annotation.KafkaListener
import org.springframework.stereotype.Service

@Service
class KafkaEventConsumer {

    @KafkaListener(topics = ["mytopic"], groupId = "test_id" )
    fun consume(message : String) : Unit {
        println(" message received from topic : $message");
    }
}

package com.zuehlke.amongeus.tasks.kafka

import com.zuehlke.amongeus.tasks.model.GameStartEvent
import com.zuehlke.amongeus.tasks.services.TaskService
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.kafka.annotation.KafkaListener
import org.springframework.stereotype.Service

@Service
class KafkaConsumer {

    @Autowired
    private lateinit var taskService: TaskService

    @KafkaListener(topics = ["game-start"])
    fun consume(gameStartEvent: GameStartEvent) {
        println(gameStartEvent)
        taskService.startGame(gameStartEvent)
    }

}
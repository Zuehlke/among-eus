package com.zuehlke.amongeus.tasks.kafka

import com.zuehlke.amongeus.tasks.model.Task
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.kafka.core.KafkaTemplate
import org.springframework.stereotype.Service

@Service
class KafkaPublisher {

    @Autowired
    constructor(kafkaTemplate: KafkaTemplate<String, Task>?) {
        this.kafkaTemplate = kafkaTemplate
    }

    private var kafkaTemplate: KafkaTemplate<String, Task>? = null;

    fun sendCreateTask(task: Task) {
        kafkaTemplate?.send("task-created", task)
    }

    fun sendCompleteTask(task: Task) {
        kafkaTemplate?.send("task-completed", task)
    }
}
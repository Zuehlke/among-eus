package com.zuehlke.amongeus.tasks.kafka

import com.fasterxml.jackson.databind.ObjectMapper
import com.zuehlke.amongeus.tasks.model.Task
import org.springframework.stereotype.Service

@Service
class TasksPublisher(private val objectMapper: ObjectMapper){

    fun taskCompleted(task: Task) {
        val taskJson = objectMapper.writeValueAsString(task)
    }
}
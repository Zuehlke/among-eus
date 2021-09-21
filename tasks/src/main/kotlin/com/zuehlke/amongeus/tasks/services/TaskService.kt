package com.zuehlke.amongeus.tasks.services

import com.zuehlke.amongeus.tasks.kafka.KafkaPublisher
import com.zuehlke.amongeus.tasks.model.CompleteTaskEvent
import com.zuehlke.amongeus.tasks.model.CreateTaskEvent
import com.zuehlke.amongeus.tasks.model.Task
import com.zuehlke.amongeus.tasks.store.TaskStore
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.stereotype.Service
import java.util.*

@Service
class TaskService {

    @Autowired
    private lateinit var kafkaPublisher: KafkaPublisher

    fun createTask(createTaskEvent: CreateTaskEvent): Task {
        val task = Task(UUID.randomUUID().toString(), createTaskEvent.lat, createTaskEvent.long,
                createTaskEvent.imgBase64, createTaskEvent.creatorId, createTaskEvent.gameId)
        TaskStore.saveOrUpdateTask(task)
        kafkaPublisher.sendCreateTask(task)
        return task
    }

    fun completeTask(completeTaskEvent: CompleteTaskEvent): Task {
        val task = TaskStore.getTask(completeTaskEvent.taskId)
        //TODO: some checks like location proximity check and check if player is the assigned player
        task.completed = true
        TaskStore.saveOrUpdateTask(task)
        kafkaPublisher.sendCompleteTask(task)
        return task
    }

}
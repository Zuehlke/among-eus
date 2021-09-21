package com.zuehlke.amongeus.tasks.services

import com.zuehlke.amongeus.tasks.model.CreateTaskEvent
import com.zuehlke.amongeus.tasks.model.Task
import com.zuehlke.amongeus.tasks.store.TaskStore
import org.springframework.stereotype.Service
import java.util.*

@Service
class TaskService {

    fun createTask(createTaskEvent: CreateTaskEvent): Task {
        val task = Task(UUID.randomUUID().toString(), createTaskEvent.lat, createTaskEvent.long, createTaskEvent.imgBase64, createTaskEvent.creatorId)
        TaskStore.saveOrUpdateTask(task)
        return task
    }
}
package com.zuehlke.amongeus.tasks.sockets

import com.zuehlke.amongeus.tasks.model.CreateTaskEvent
import com.zuehlke.amongeus.tasks.model.Task
import com.zuehlke.amongeus.tasks.services.TaskService
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.messaging.handler.annotation.MessageMapping
import org.springframework.messaging.handler.annotation.SendTo
import org.springframework.stereotype.Controller


@Controller
class TaskSockets {

    @Autowired
    private lateinit var taskService: TaskService

    @MessageMapping("/tasks/create")
    @SendTo("/tasks/create")
    @Throws(Exception::class)
    fun greeting(createEvent: CreateTaskEvent): Task {
        val task = taskService.createTask(createEvent)
        println(createEvent)
        return task
    }
}
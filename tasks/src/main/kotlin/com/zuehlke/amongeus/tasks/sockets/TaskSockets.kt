package com.zuehlke.amongeus.tasks.sockets

import com.zuehlke.amongeus.tasks.model.CompleteTaskEvent
import com.zuehlke.amongeus.tasks.model.CreateTaskEvent
import com.zuehlke.amongeus.tasks.model.Task
import com.zuehlke.amongeus.tasks.services.SessionService
import com.zuehlke.amongeus.tasks.services.TaskService
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.messaging.handler.annotation.Header
import org.springframework.messaging.handler.annotation.MessageMapping
import org.springframework.messaging.simp.annotation.SendToUser
import org.springframework.stereotype.Controller


@Controller
class TaskSockets {

    @Autowired
    private lateinit var taskService: TaskService

    @Autowired
    private lateinit var sessionService: SessionService

    @MessageMapping("/create")
    @SendToUser("/create")
    fun createTask(@Header("simpSessionId") sessionId: String, createEvent: CreateTaskEvent): Task {
        val task = taskService.createTask(createEvent)
        sessionService.saveSession(sessionId, createEvent.creatorId, createEvent.gameId)
        println(sessionService.getBySessionId(sessionId))
        println(createEvent)
        return task
    }

    @MessageMapping("/complete")
    @SendToUser("/complete")
    fun completeTask(completeEvent: CompleteTaskEvent): Task {
        return taskService.completeTask(completeEvent)
    }

}
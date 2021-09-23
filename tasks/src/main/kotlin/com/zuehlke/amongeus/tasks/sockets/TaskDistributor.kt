package com.zuehlke.amongeus.tasks.sockets

import com.zuehlke.amongeus.tasks.model.Task
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.messaging.simp.SimpMessagingTemplate
import org.springframework.stereotype.Service

@Service
class TaskDistributor {

    @Autowired
    private lateinit var simp: SimpMessagingTemplate

    fun sendAssignedTasks(tasks: List<Task>) {
        simp.convertAndSend("/tasks/assigned", tasks) //TODO: discuss endpoint with frontend
    }

}
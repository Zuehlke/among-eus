package com.zuehlke.amongeus.tasks.sockets

import org.springframework.messaging.handler.annotation.MessageMapping
import org.springframework.messaging.handler.annotation.SendTo
import org.springframework.stereotype.Controller


@Controller
class TaskSockets {

    @MessageMapping("/tasks")
    @SendTo("/topic/result")
    @Throws(Exception::class)
    fun greeting(message: String): String {
        println(message);
        return "success";
    }
}
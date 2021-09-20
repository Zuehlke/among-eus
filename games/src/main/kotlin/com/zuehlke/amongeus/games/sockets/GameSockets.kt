package com.zuehlke.amongeus.games.sockets

import org.springframework.messaging.handler.annotation.MessageMapping
import org.springframework.messaging.handler.annotation.SendTo
import org.springframework.stereotype.Controller


@Controller
class GameSockets {

    @MessageMapping("/game")
    @SendTo("/topic/result")
    @Throws(Exception::class)
    fun greeting(message: String): String {
        println(message);
        return "success";
    }
}
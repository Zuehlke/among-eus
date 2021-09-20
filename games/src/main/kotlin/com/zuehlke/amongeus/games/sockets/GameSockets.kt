package com.zuehlke.amongeus.games.sockets

import org.springframework.messaging.handler.annotation.MessageMapping
import org.springframework.messaging.handler.annotation.SendTo
import org.springframework.stereotype.Controller
import org.springframework.web.util.HtmlUtils


@Controller
class GameSockets {

    @MessageMapping("/game")
    @Throws(Exception::class)
    fun greeting(message: String) {
        println(message);
    }
}
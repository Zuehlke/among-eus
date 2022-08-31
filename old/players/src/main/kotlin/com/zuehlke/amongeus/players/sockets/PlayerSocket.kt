package com.zuehlke.amongeus.players.sockets
import com.zuehlke.amongeus.players.event.CreateEvent
import com.zuehlke.amongeus.players.event.KilledEvent
import com.zuehlke.amongeus.players.event.UpdatePositionEvent
import com.zuehlke.amongeus.players.services.PlayerService
import org.springframework.messaging.handler.annotation.MessageMapping
import org.springframework.messaging.simp.SimpMessageSendingOperations
import org.springframework.stereotype.Controller

@Controller
class PlayerSocket (
        private val playerService: PlayerService,
        private val simp: SimpMessageSendingOperations
){

    @MessageMapping("/create")
    fun create(createEvent: CreateEvent) {
        playerService.create(createEvent.name)
    }

    @MessageMapping("/killed")
    fun killed(killedEvent: KilledEvent) {
        playerService.killed(killedEvent.playerId)
    }

    @MessageMapping("/update-position")
    fun updatePosition(updateEvent: UpdatePositionEvent) {
        playerService.updatePosition(updateEvent.playerId, updateEvent.lat, updateEvent.long)
    }

    fun sendImposters(gameId: String) {
        val players = playerService.getPlayersByGame(gameId)
        players.forEach {
            simp.convertAndSend("/imposter/${it.id}", it.isImposter)
        }
    }
}
package com.zuehlke.amongeus.players.services

import com.zuehlke.amongeus.players.kafka.PlayerKilledEventProducer
import com.zuehlke.amongeus.players.kafka.PlayerTopicProducer
import com.zuehlke.amongeus.players.models.Game
import com.zuehlke.amongeus.players.models.Player
import org.springframework.stereotype.Service

@Service
class PlayerService(val playerTopicProducer: PlayerTopicProducer, val playerKilledEventProducer: PlayerKilledEventProducer) {

    //Publishes in topic
    fun create(nameId: String) {
        playerTopicProducer.create(nameId)
    }

    //Reads from Game topic
    fun gameStarted(game: Game) {
// save user ids
//        select imposter game.getNumberOfImposter
    }

    //Has 2 origins, from client and kafka queue (voting topic)
    //Publishes in topic (Send info about which player are still alive)
    fun killed(gameId: String, playerId: String) {
        playerKilledEventProducer.playerKilled(gameId, playerId)
    }

    //Reads from Game topic
    fun selectImposter(gameId: String, count: Int): List<Player> {
        return ArrayList()
    }


    //Create
    //Name resolve
    //ImposterSelected
    //
}

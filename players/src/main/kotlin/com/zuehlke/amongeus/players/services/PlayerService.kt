package com.zuehlke.amongeus.players.services

import com.zuehlke.amongeus.players.models.Player
import com.zuehlke.amongeus.players.stores.PlayerStore
import org.springframework.stereotype.Service

@Service
class PlayerService {

    //Publishes in topic
    fun create(nameId: String) {

    }

    //Reads from Game topic
    fun joined(gameId: String, playerId: String) {

    }

    //Has 2 origins, from client and kafka queue (voting topic)
    //Publishes in topic (Send info about which player are still alive)
    fun killed(gameId: String, playerId: String) {

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
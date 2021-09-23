package com.zuehlke.amongeus.players.services

import com.zuehlke.amongeus.players.kafka.PlayerKilledEventProducer
import com.zuehlke.amongeus.players.kafka.PlayerTopicProducer
import com.zuehlke.amongeus.players.models.Game
import com.zuehlke.amongeus.players.models.Player
import com.zuehlke.amongeus.players.models.PlayerProximity
import com.zuehlke.amongeus.players.stores.PlayerProximitiesStore
import com.zuehlke.amongeus.players.stores.PlayerStore
import org.springframework.stereotype.Service
import java.util.*
import kotlin.collections.ArrayList

@Service
class PlayerService(val playerTopicProducer: PlayerTopicProducer, val playerKilledEventProducer: PlayerKilledEventProducer) {

    fun getPlayersByGame(gameId: String): List<Player> {
        return PlayerStore.getPlayersByGame(gameId)
    }

    fun create(name: String): Player {
        val player = Player(UUID.randomUUID().toString(), name, "",
                isLiving = true, isImposter = false, long = 0.0, lat = 0.0)
        return PlayerStore.saveOrUpdatePlayer(player)
    }

    //Reads from Game topic
    fun joined(gameId: String, playerId: String): Player {
        val player = PlayerStore.getPlayer(playerId)!!
        player.gameId = gameId
        return PlayerStore.saveOrUpdatePlayer(player)
    }

    //Has 2 origins, from client and kafka queue (voting topic)
    //Publishes in topic (Send info about which player are still alive)
    fun killed(playerId: String): List<Player> {
        val player = PlayerStore.getPlayer(playerId)!!
        player.isLiving = false
        PlayerStore.saveOrUpdatePlayer(player)
        playerKilledEventProducer.playerKilled(player.gameId, playerId)

        return PlayerStore.getPlayersByGame(player.gameId)
    }

    //Reads from Game topic
    fun assignImposter(gameId: String, count: Int): List<Player> {
        val players = PlayerStore.getPlayersByGame(gameId);
        val imposters = ArrayList<Player>()
        for (i in 1..count) {
            val rnd = (players.indices).random()
            val player = players[rnd]
            player.isImposter = true
            PlayerStore.saveOrUpdatePlayer(player)
            imposters.add(players[rnd])
        }
        return imposters
    }

    fun updatePosition(playerId: String, long: Double, lat: Double) {
        val player = PlayerStore.getPlayer(playerId)!!
        player.long = long
        player.lat = lat
        PlayerStore.saveOrUpdatePlayer(player)
        calculateProximities(player.gameId)
    }

    private fun calculateProximities(playerId: String):List<PlayerProximity> {

        // Calc proximities for this player
        val player = PlayerStore.getPlayer(playerId)!!
        val players = PlayerStore.getPlayersByGame(player.gameId) !!
        val distanceCalc = DistanceCalculator()
        val proximities = ArrayList<PlayerProximity>()
        players.forEach {
            if (it != player) {
                val distance = distanceCalc.getDistanceInKm(player,it)
                if (distance < 0.01) {
                    proximities.add(proximity(it, player, distance))
                }
            }
        }

        // Remove player from other player's proximities not anymore in proximity
        val existingProximities = PlayerProximitiesStore.getProximities(playerId) !!
        existingProximities.forEach {
            if (!proximities.contains(it)) {
                removeOtherPlayerProximity(it.id, it)
            }
        }

        // Update player in other player's proximities
        proximities.forEach {
            updateOtherPlayerProximity(it.id, it)
        }

        // Store and send update proximities for this player
        PlayerProximitiesStore.saveOrUpdateProximities(player.id, proximities)
        sendUpdateProximities(playerId, proximities)
        return proximities
    }

    private fun proximity(currentPlayer:Player, player:Player, distance:Double): PlayerProximity {
        return PlayerProximity(player.id,
                player.name,
                player.isLiving,
                distance<0.005,
                currentPlayer.isImposter && player.isImposter,
                player.lat,
                player.long,
                distance)

    }

    private fun updateOtherPlayerProximity(playerId: String, proximity: PlayerProximity) {
        val proximities = PlayerProximitiesStore.getProximities(playerId)
        proximities.remove(proximity) // with same id (see equals)
        proximities.add(proximity)
        PlayerProximitiesStore.saveOrUpdateProximities(playerId, proximities)
        sendUpdateProximities(playerId, proximities)
    }


    private fun removeOtherPlayerProximity(playerId: String, proximity: PlayerProximity) {
        val proximities = PlayerProximitiesStore.getProximities(playerId)
        proximities.remove(proximity) // with same id (see equals)
        PlayerProximitiesStore.saveOrUpdateProximities(playerId, proximities)
        sendUpdateProximities(playerId, proximities)
    }

    private fun sendUpdateProximities(playerId: String, proximities: ArrayList<PlayerProximity>) {
        // TODO send event to frontend

    }

}
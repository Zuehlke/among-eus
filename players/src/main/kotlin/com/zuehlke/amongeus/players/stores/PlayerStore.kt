package com.zuehlke.amongeus.players.stores

import com.zuehlke.amongeus.players.models.Player

class PlayerStore {
    companion object {
        private val map = HashMap<String,Player>()

        fun saveOrUpdatePlayer(game: Player): Player {
            map[game.id] = game
            return game
        }

        fun getPlayer() : List<Player> {
            return map.values.toList()
        }

        fun getPlayer(key:String): Player? {
            return map[key]
        }

        fun deletePlayer(key: String) {
            map.remove(key)
        }
    }
}
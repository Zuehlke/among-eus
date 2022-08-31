package com.zuehlke.amongeus.games.store

import com.zuehlke.amongeus.games.models.Game
import kotlin.collections.HashMap

class GameStore {
    companion object {
        private val map = HashMap<String,Game>()

        fun saveOrUpdateGame(game: Game): Game {
            map[game.gameId] = game
            return game
        }

        fun getGames() : List<Game> {
            return map.values.toList()
        }

        fun getGame(key:String): Game? {
            return map[key]
        }

        fun deleteGame(key: String) {
            map.remove(key)
        }
    }
}
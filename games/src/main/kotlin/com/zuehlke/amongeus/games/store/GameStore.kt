package com.zuehlke.amongeus.games.store

class GameStore {
    companion object {
        private val map = HashMap<String,String>()

        fun saveOrUpdateGame(key:String, game: String) {
            map[key] = game
        }

        fun getGame(key:String): String? {
            return map[key]
        }
    }

}
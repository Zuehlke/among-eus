package com.zuehlke.amongeus.players.stores

import com.zuehlke.amongeus.players.models.Player
import com.zuehlke.amongeus.players.models.PlayerProximity

class PlayerProximitiesStore {
    companion object {

        private val map = HashMap<String,ArrayList<PlayerProximity>>()

        fun saveOrUpdateProximities(playerId: String, proximities: ArrayList<PlayerProximity>): ArrayList<PlayerProximity> {
            map[playerId] = proximities
            return proximities
        }

        fun getProximities(key:String): ArrayList<PlayerProximity> {
            val res = map[key]
            if (res == null)
                return ArrayList<PlayerProximity>()
                else return res
        }

        fun deletePlayer(key: String) {
            map.remove(key)
        }
    }
}
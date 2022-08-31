package com.zuehlke.amongeus.players.services

import com.zuehlke.amongeus.players.models.Player

class DistanceCalculator {

    fun getDistanceInKm(p1: Player, p2: Player): Double {
        val R = 6371.0; // Radius of the earth in km
        val dLat = deg2rad(p1.lat-p2.lat)  // deg2rad below
        val dLon = deg2rad(p1.long-p2.long)
        val a = Math.sin(dLat/2) * Math.sin(dLat/2) +
                        Math.cos(deg2rad(p1.lat)) * Math.cos(deg2rad(p2.lat)) *
                        Math.sin(dLon/2) * Math.sin(dLon/2)
        val c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a))
        val d = R * c // Distance in km
        return d
    }

    private fun deg2rad(deg:Double):Double {
        return deg * (Math.PI/180)
    }
}
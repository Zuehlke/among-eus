package com.zuehlke.amongeus.players.models

data class PlayerProximity(val id: String, val name: String, var isLiving: Boolean, var killable: Boolean, var isPartnerImposter: Boolean, var lat: Double, var long: Double, var distance:Double) {

    override fun equals(other: Any?): Boolean{
        if (this === other) return true
        if (other?.javaClass != javaClass) return false
        other as PlayerProximity
        return id == other.id
    }

    override fun hashCode(): Int{
        return id.hashCode()
    }

}
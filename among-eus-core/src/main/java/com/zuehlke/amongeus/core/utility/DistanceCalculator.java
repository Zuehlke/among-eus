package com.zuehlke.amongeus.core.utility;

import com.zuehlke.amongeus.core.model.Player;

public class DistanceCalculator {

    // Radius of the earth in km
    public static final double RADIUS_OF_WORLD_IN_METER = 6_371_000;

    public static double getDistanceInMeter(Player p1, Player p2){
        var dLat = deg2rad(p1.getLatitude()-p2.getLatitude());  // deg2rad below
        var dLon = deg2rad(p1.getLongitude()-p2.getLongitude());
        var a = Math.sin(dLat/2) * Math.sin(dLat/2) +
                        Math.cos(deg2rad(p1.getLatitude())) * Math.cos(deg2rad(p2.getLatitude())) *
                        Math.sin(dLon/2) * Math.sin(dLon/2);
        var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
        return RADIUS_OF_WORLD_IN_METER * c;
    }

    private static double deg2rad(double deg) {
        return deg * (Math.PI/180);
    }
}
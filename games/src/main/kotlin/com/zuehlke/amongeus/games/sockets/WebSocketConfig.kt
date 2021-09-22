package com.zuehlke.amongeus.games.sockets

import org.springframework.context.annotation.Configuration
import org.springframework.web.socket.config.annotation.AbstractWebSocketMessageBrokerConfigurer
import org.springframework.web.socket.config.annotation.EnableWebSocket
import org.springframework.web.socket.config.annotation.EnableWebSocketMessageBroker
import org.springframework.web.socket.config.annotation.StompEndpointRegistry


@Configuration
@EnableWebSocket
@EnableWebSocketMessageBroker
class WebSocketConfig : AbstractWebSocketMessageBrokerConfigurer() {
    override fun registerStompEndpoints(registry: StompEndpointRegistry) {
        registry.addEndpoint("/game").setAllowedOrigins("*");
    }
}
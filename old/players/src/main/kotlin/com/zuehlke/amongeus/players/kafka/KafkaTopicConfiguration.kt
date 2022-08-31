package com.zuehlke.amongeus.players.kafka

import org.apache.kafka.clients.admin.NewTopic
import org.springframework.context.annotation.Bean
import org.springframework.context.annotation.Configuration
import org.springframework.kafka.config.TopicBuilder

@Configuration
class KafkaTopicConfiguration {

    @Bean
    fun createPlayer(): NewTopic {
        println("Creating player topic.")
        return TopicBuilder.name("player")
            .partitions(1)
            .replicas(1)
            .build()
    }    @Bean
    fun createPlayerKilledTopic(): NewTopic {
        println("Creating player topic.")
        return TopicBuilder.name("player_killed")
            .partitions(1)
            .replicas(1)
            .build()
    }
}

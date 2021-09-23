package com.zuehlke.amongeus.games.config

import org.apache.kafka.clients.admin.NewTopic
import org.springframework.context.annotation.Bean
import org.springframework.context.annotation.Configuration
import org.springframework.kafka.config.TopicBuilder

@Configuration
class KafkaTopicConfiguration {

    @Bean
    fun gameStartTopic(): NewTopic {
        return TopicBuilder.name("game-start")
                .partitions(1)
                .replicas(1)
                .build()
    }
}
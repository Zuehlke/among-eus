package com.zuehlke.amongeus.players.kafka

import org.apache.kafka.clients.admin.NewTopic
import org.springframework.context.annotation.Bean
import org.springframework.context.annotation.Configuration
import org.springframework.kafka.config.TopicBuilder

@Configuration
class KafkaTopicConfiguration {

    @Bean
    fun topicExample(): NewTopic {
        println("Creating topics.")
        return TopicBuilder.name("mytopic")
            .partitions(1)
            .replicas(1)
            .build()
    }
}
package com.zuehlke.amongeus.tasks.config

import org.apache.kafka.clients.admin.NewTopic
import org.springframework.context.annotation.Bean
import org.springframework.context.annotation.Configuration
import org.springframework.kafka.config.TopicBuilder

@Configuration
class KafkaTopicConfiguration {

    @Bean
    fun taskCreatedTopic(): NewTopic {
        return TopicBuilder.name("task-created")
                .partitions(1)
                .replicas(1)
                .build()
    }

    @Bean
    fun taskCompletedTopic(): NewTopic {
        return TopicBuilder.name("task-completed")
                .partitions(1)
                .replicas(1)
                .build()
    }
}
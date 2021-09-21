package com.zuehlke.amongeus.players.kafka

import org.apache.kafka.clients.producer.KafkaProducer
import org.apache.kafka.clients.producer.ProducerRecord
import org.apache.kafka.clients.producer.RecordMetadata
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.boot.autoconfigure.kafka.KafkaProperties
import org.springframework.http.ResponseEntity
import org.springframework.kafka.core.KafkaTemplate
import org.springframework.kafka.support.SendResult
import org.springframework.util.concurrent.ListenableFuture as ListenableFuture
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.RequestParam
import org.springframework.web.bind.annotation.RestController
import java.util.concurrent.Future
import javax.annotation.PostConstruct

@RestController
class KafkaController {

    @Autowired
    constructor(kafkaTemplate: KafkaTemplate<String, String>?, kafkaProperties: KafkaProperties) {
        this.kafkaTemplate = kafkaTemplate
        this.kafkaProperties = kafkaProperties;
    }

    var kafkaTemplate: KafkaTemplate<String, String>? = null;
    var kafkaProperties: KafkaProperties;
    val topic: String = "mytopic"

    @PostConstruct
    fun initKafka() {
        sendMessage("just a start message")
    }

    @GetMapping("/send")
    fun sendMessage(@RequestParam("message") message: String): ResponseEntity<String> {
        var lf: ListenableFuture<SendResult<String, String>> = kafkaTemplate?.send(topic, message)!!
        var sendResult: SendResult<String, String> = lf.get()
        return ResponseEntity.ok(sendResult.producerRecord.value() + " sent to topic")
    }

    @GetMapping("/produce")
    fun produceMessage(@RequestParam("message") message: String): ResponseEntity<String> {
        var producerRecord: ProducerRecord<String, String> = ProducerRecord(topic, message)

        var producer = KafkaProducer<String, String>(kafkaProperties.buildProducerProperties())
        var future: Future<RecordMetadata> = producer?.send(producerRecord)!!
        return ResponseEntity.ok(" message sent to " + future.get().topic());
    }
}

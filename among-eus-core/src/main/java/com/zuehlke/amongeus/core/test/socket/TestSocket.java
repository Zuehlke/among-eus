package com.zuehlke.amongeus.core.test.socket;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.messaging.rsocket.annotation.ConnectMapping;
import org.springframework.messaging.simp.annotation.SubscribeMapping;
import org.springframework.stereotype.Controller;

@Controller
public class TestSocket {

    Logger logger = LoggerFactory.getLogger(TestSocket.class);

    @MessageMapping("/test")
    @SendTo("/topic/test")
    private String testPing(String pong) {
        logger.info(pong);
        return "pong";
    }

    @SubscribeMapping("/test")
    private void testConnectPing() {
        logger.info("connected");
    }

    @ConnectMapping
    private void connect() {
        logger.info("it connecc");
    }
}

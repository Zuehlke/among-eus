package com.zuehlke.amongeus.core.test.socket;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.handler.annotation.Header;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.rsocket.annotation.ConnectMapping;
import org.springframework.messaging.simp.annotation.SendToUser;
import org.springframework.messaging.simp.annotation.SubscribeMapping;

public class TestSocket {

    Logger logger = LoggerFactory.getLogger(TestSocket.class);

    @MessageMapping("/test")
    @SendToUser("/topic/test")
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

package com.zuehlke.amongeus.core.player;

import com.zuehlke.amongeus.core.model.Player;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.web.server.LocalServerPort;
import org.springframework.messaging.converter.MappingJackson2MessageConverter;
import org.springframework.messaging.simp.stomp.StompFrameHandler;
import org.springframework.messaging.simp.stomp.StompHeaders;
import org.springframework.messaging.simp.stomp.StompSession;
import org.springframework.messaging.simp.stomp.StompSessionHandlerAdapter;
import org.springframework.web.socket.client.standard.StandardWebSocketClient;
import org.springframework.web.socket.messaging.WebSocketStompClient;
import org.springframework.web.socket.sockjs.client.SockJsClient;
import org.springframework.web.socket.sockjs.client.WebSocketTransport;

import java.lang.reflect.Type;
import java.util.Collection;
import java.util.List;
import java.util.Map;
import java.util.concurrent.ArrayBlockingQueue;
import java.util.concurrent.BlockingQueue;

import static java.util.concurrent.TimeUnit.SECONDS;
import static org.awaitility.Awaitility.await;
import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;


@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
class PlayerControllerIntegrationsTest {
    @LocalServerPort
    private int port;
    private WebSocketStompClient webSocketStompClient;

    @BeforeEach
    void setup() {
        this.webSocketStompClient = new WebSocketStompClient(new SockJsClient(
                List.of(new WebSocketTransport(new StandardWebSocketClient()))));
    }


    @Test
    void verifyWelcomeMessageIsSent() throws Exception {
        BlockingQueue<Object> blockingQueue = new ArrayBlockingQueue<>(1);
        webSocketStompClient.setMessageConverter(new MappingJackson2MessageConverter());

        StompSession session = webSocketStompClient
                .connect(getWsPath(), new StompSessionHandlerAdapter() {
                })
                .get(1, SECONDS);

        session.subscribe("/topic/positions", new StompFrameHandler() {

            @Override
            public Type getPayloadType(StompHeaders headers) {
                return Collection.class;
            }

            @Override
            public void handleFrame(StompHeaders headers, Object payload) {
                blockingQueue.add(payload);
            }
        });

        var pm = new PlayerMessage();
        pm.setGameId("it test");
        var p = new Player();
        p.setLongitude(123.123d);
        p.setLatitude(123.123d);
        p.setAccuracy(12.12f);
        p.setUsername("Oli");
        pm.setPlayer(p);
        session.send("/app/positions", pm);

        await()
                .atMost(10, SECONDS)
                .untilAsserted(() -> {
                    List<Map<String, String>> result = (List) blockingQueue.poll();
                    assertNotNull(result);
                    assertEquals(p.getUsername(), result.get(0).get("username"));
                });
    }

    private String getWsPath() {
        return String.format("ws://localhost:%d/socket", port);
    }
}
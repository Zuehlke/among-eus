var stompClient = null;

const playerPayloadTemplate = {
        username: 'mathis',
        longitude: 11.5,
        latitude: 22.5,
        accuracy: 33.5
};

const taskCreatePayloadTemplate = {
    longitude: 11.5,
    latitude: 22.5
};

const taskCompletePayloadTemplate = {
    taskId: '1'
};

const playerKillPayloadTemplate = {
    killerId: 'mathis',
    killedId: 'daniel'
};

const playerReadyPayloadTemplate = {
    numberOfTerrorists: 1
};

function setConnected(connected) {
    $("#connect").prop("disabled", connected);
    $("#disconnect").prop("disabled", !connected);
    if (connected) {
        $("#conversation").show();
    }
    else {
        $("#conversation").hide();
    }
    $("#greetings").html("");
}

function connect() {
    var socket = new SockJS('/socket');
    stompClient = Stomp.over(socket);

    stompClient.connect({}, function (frame) {
        const gameId = $('#gameId').val()
        console.log(`${gameId}`);
        setConnected(true);
        console.log(`Connected with gameId={gameId}, frame={frame}`);
        stompClient.subscribe(`/topic/game/${gameId}/players`, function (event) {
            console.log(`Received event '/topic/game/${gameId}/players' websocket`, event);
            showEventMessage("#players", event.body);
        });
        stompClient.subscribe(`/topic/game/${gameId}/tasks`, function (event) {
            console.log(`Received event '/topic/game/${gameId}/tasks' websocket`, event);
            showEventMessage("#tasks", event.body);
        });
        stompClient.subscribe(`/topic/game/${gameId}/players/killed`, function (event) {
            console.log(`Received event '/topic/game/${gameId}/players/killed' websocket`, event);
            showEventMessage("#player-killed-events", event.body);
        });
        stompClient.subscribe(`/topic/game/${gameId}`, function (event) {
            console.log(`Received event '/topic/game/${gameId}' websocket`, event);
            showEventMessage("#gameState-event", event.body);
        });
    });
}

function disconnect() {
    if (stompClient !== null) {
        stompClient.disconnect();
    }
    setConnected(false);
    console.log("Disconnected");
}

function sendPlayer() {
    const gameId = $('#gameId').val()
    const player = $( "#players-payload" ).val();
    stompClient.send(`/app/game/${gameId}/players`, {}, player);
}

function sendGameStart() {
    const gameId = $( "#gameId" ).val();
    const gameConfig = $( "#game-config-payload" ).val();
    console.log("game start");
    stompClient.send(`/app/game/${gameId}/start`, {}, gameConfig);
}

function sendGameJoin() {
    const gameId = $( "#gameId" ).val();
    console.log("game join");
    stompClient.send(`/app/game/${gameId}/join`, {});
}

function createTask() {
    const gameId = $('#gameId').val()
    const task = $("#create-task-payload").val();
    stompClient.send(`/app/game/${gameId}/tasks`, {}, task);
}

function sendKillPlayer() {
    const gameId = $('#gameId').val()
    const playerKillMsg = $( "#player-kill-payload" ).val();
    stompClient.send(`/app/game/${gameId}/players/kill`, {}, playerKillMsg);
}

function updateTask() {
    const gameId = $('#gameId').val()
    const task = $("#update-task-payload").val();
    stompClient.send(`/app/game/${gameId}/tasks/complete`, {}, task);
}

function showEventMessage(elementId, message) {
    let payload = JSON.parse(message);
    let date = new Date();
    $(elementId).prepend("<tr><td><pre>Event received at " + date.toISOString() + "\n" + JSON.stringify(payload, null, 4) + "</pre></td></tr>");

}

$(function () {
    $("form").on('submit', function (e) {
        e.preventDefault();
    });


    $("#connect").click(function() { connect(); });
    $("#disconnect").click(function() { disconnect(); });

    $("#players-send").click(function() { sendPlayer(); });
    $("#player-kill-send").click(function() { sendKillPlayer(); });

    $("#create-task-send").click(function() { createTask(); });
    $("#update-task-send").click(function() { updateTask(); });

    $("#game-start-send").click(function() { sendGameStart(); });
    $("#game-join-send").click(function() { sendGameJoin(); });

    $("#players-payload").val(JSON.stringify(playerPayloadTemplate, null, 4));
    $("#create-task-payload").val(JSON.stringify(taskCreatePayloadTemplate, null, 4));
    $("#game-config-payload").val(JSON.stringify(playerReadyPayloadTemplate, null, 4));
    $("#update-task-payload").val(JSON.stringify(taskCompletePayloadTemplate, null, 4));
    $("#player-kill-payload").val(JSON.stringify(playerKillPayloadTemplate, null, 4));
});


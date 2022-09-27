var stompClient = null;

const playerPayloadTemplate = {
    gameId: 'rigi',
    player: {
        username: 'mathis',
        longitude: 11.5,
        latitude: 22.5,
        accuracy: 33.5
    }
};

const taskCreatePayloadTemplate = {
    gameId: 'rigi',
    longitude: 11.5,
    latitude: 22.5
};

const taskUpdatePayloadTemplate = {
    gameId: 'rigi',
    taskId: 'taskId'
};

const playerKillPayloadTemplate = {
    gameId: 'rigi',
    killerId: 'mathis',
    killedId: 'daniel'
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
        setConnected(true);
        console.log('Connected: ' + frame);
        stompClient.subscribe('/topic/players', function (event) {
            console.log("Received event '/topic/players' websocket", event);
            showEventMessage("#players", event.body);
        });

        stompClient.subscribe('/topic/tasks', function (event) {
            console.log("Received event '/topic/tasks' websocket", event);
            showEventMessage("#tasks", event.body);
        });
        stompClient.subscribe('/topic/players/killed', function (event) {
            console.log("Received event '/topic/players/killed' websocket", event);
            showEventMessage("#killed", event.body);
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
    const player = $( "#players-payload" ).val();
    stompClient.send("/app/players", {}, player);
}

function createTask() {
    const task = $("#create-task-payload").val();
    stompClient.send("/app/tasks", {}, task);
}

function sendKillPlayer() {
    const playerKillMsg = $( "#player-kill-payload" ).val();
    stompClient.send("/app/players/killed", {}, playerKillMsg);
}

function updateTask() {
    const task = $("#update-task-payload").val();
    stompClient.send("/app/tasks/complete", {}, task);
}

function showEventMessage(elementId, message) {
    $(elementId).append("<tr><td><pre>" + JSON.stringify(message, null, 4) + "</pre></td></tr>");

}

$(function () {
    $("form").on('submit', function (e) {
        e.preventDefault();
    });


    $("#connect").click(function() { connect(); });
    $("#disconnect").click(function() { disconnect(); });

    $("#players-send").click(function() { sendPlayer(); });
    $( "#kill-player-send" ).click(function() { sendKillPlayer(); });

    $("#create-task-send").click(function() { createTask(); });
    $("#update-task-send").click(function() { updateTask(); });

    $("#players-payload").val(JSON.stringify(playerPayloadTemplate, null, 4));
    $("#create-task-payload").val(JSON.stringify(taskCreatePayloadTemplate, null, 4));
    $("#update-task-payload").val(JSON.stringify(taskUpdatePayloadTemplate, null, 4));
    $("#player-kill-payload").val(JSON.stringify(playerKillPayloadTemplate, null, 4));
});


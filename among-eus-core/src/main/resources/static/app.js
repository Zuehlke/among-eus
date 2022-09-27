var stompClient = null;

const playerPayloadTemplate = {
    gameId: 'gameId',
    player: {
        username: 'bob',
        longitude: 11.5,
        latitude: 22.5,
        accuracy: 33.5
    }
};

const taskCreatePayloadTemplate = {
    gameId: 'gameId',
    longitude: 11.5,
    latitude: 22.5
};

const taskUpdatePayloadTemplate = {
    gameId: 'gameId',
    taskId: 'taskId'
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
        stompClient.subscribe('/topic/players', function (response) {
            showPlayers(response.body);
        });

        stompClient.subscribe('/topic/tasks', function (response) {
            showTasks(response.body);
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

function updateTask() {
    const task = $("#update-task-payload").val();
    stompClient.send("/app/tasks/complete", {}, task);
}

function showPlayers(message) {
    $("#players").append("<tr><td><pre>" + JSON.stringify(message, null, 4) + "</pre></td></tr>");
}

function showTasks(message) {
    $("#tasks").append("<tr><td><pre>" + JSON.stringify(message, null, 4) + "</pre></td></tr>");
}

$(function () {
    $("form").on('submit', function (e) {
        e.preventDefault();
    });
    $("#connect").click(function() { connect(); });
    $("#disconnect").click(function() { disconnect(); });
    $("#players-send").click(function() { sendPlayer(); });
    $("#create-task-send").click(function() { createTask(); });
    $("#update-task-send").click(function() { updateTask(); });

    $("#players-payload").val(JSON.stringify(playerPayloadTemplate, null, 4));
    $("#create-task-payload").val(JSON.stringify(taskCreatePayloadTemplate, null, 4));
    $("#update-task-payload").val(JSON.stringify(taskUpdatePayloadTemplate, null, 4));
});


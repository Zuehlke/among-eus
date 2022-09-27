var stompClient = null;

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
        stompClient.subscribe('/topic/players', function (greeting) {
            console.log("Response over '/topic/players' websocket", greeting);
            showGreeting(greeting.body);
        });
        stompClient.subscribe('/topic/players/killed', function (killed) {
            console.log("Response over '/topic/players/killed' websocket", killed);
            showGreeting(killed.body);
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

function createOrUpdatePlayer() {
    const username = $("#name").val();
    stompClient.send("/app/players", {}, JSON.stringify({
        gameId: 'gameId',
        player: {
            username,
            longitude: 10.5,
            latitude: 10.5,
            accuracy: 10.5
        }
    }));
}
function killPlayer() {
    const killerId = $("#killer").val();
    const killedId = $("#killed").val();
    stompClient.send("/app/players/killed", {}, JSON.stringify({
        gameId: 'gameId',
        killerId: killerId,
        killedId: killedId
    }));
}

function showGreeting(message) {
    $("#greetings").append("<tr><td>" + message + "</td></tr>");
}

$(function () {
    $("form").on('submit', function (e) {
        e.preventDefault();
    });
    $( "#connect" ).click(function() { connect(); });
    $( "#disconnect" ).click(function() { disconnect(); });
    $( "#createOrUpdatePlayer" ).click(function() { createOrUpdatePlayer(); });
    $( "#killPlayer" ).click(function() { killPlayer(); });
});


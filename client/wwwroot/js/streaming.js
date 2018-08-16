"use strict";

var connection = new signalR.HubConnectionBuilder()
                    .withUrl("http://10.192.202.167:8080/streamHub")
                    .build();
console.log(connection);
connection.on("ReceiveStream", function (ip, port) {
    var encodedMsg = `Get ${ip}:${port} streaming.`
    var li = document.createElement("li");
    li.textContent = encodedMsg;
    document.getElementById("messagesList").appendChild(li);
});

connection.start().catch(function (err) {
    return console.error(err.toString());
});

document.getElementById("sendButton").addEventListener("click", function (event) {
    var user = document.getElementById("ipInput").value;
    var message = document.getElementById("portInput").value;
    connection.invoke("GetStream", user, message).catch(function (err) {
        return console.log(err);
    });
    event.preventDefault();
});
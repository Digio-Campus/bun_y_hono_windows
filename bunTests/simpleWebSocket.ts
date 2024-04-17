const server = Bun.serve<{ authToken: string }>({
    fetch(req, server) {
        const success = server.upgrade(req);
        if (success) {
            // Bun automatically returns a 101 Switching Protocols
            // if the upgrade succeeds
            return undefined;
        }

        // handle HTTP request normally
        return new Response("Hello world!");
    },
    websocket: {
        //Opcion para comprimir todos los mensajes
        // perMessageDeflate: true,

        // this is called when a message is received
        async message(ws, message) {
            console.log(`Received ${message}`);
            // send back a message
            ws.send(`You said: ${message}`);
            // ws.send(message, true);  //el true es para comprimir mensajes individuales
        },
    },
});

console.log(`Listening on ${server.hostname}:${server.port}`);


// esto lo escribo en la consola del browser

// const socket = new WebSocket('ws://localhost:3000');
// socket.send("prueba")

//me devuelve correctamente el mensaje
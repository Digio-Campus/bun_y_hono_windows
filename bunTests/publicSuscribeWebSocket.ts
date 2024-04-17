const server = Bun.serve<{ username: string }>({
    fetch(req, server) {
      const username = "adsd"
      const success = server.upgrade(req, { data: { socketId: Math.random()} });
      if (success) return undefined;     
  
      return new Response("Hello world");
    },
    websocket: {
      open(ws) {
        const msg = `${ws.data.username} has entered the chat`;
        ws.subscribe("darkchat");
        server.publish("darkchat", msg);
      },
      message(ws, message) {
        server.publish("darkchat", `${ws.data.username}: ${message}`);
      },
      close(ws) {
        const msg = `${ws.data.username} has left the chat`;
        server.publish("darkchat", msg);
        ws.unsubscribe("darkchat");
      },
    },
  });
  
  console.log(`Listening on ${server.hostname}:${server.port}`);





//Similar al anterior solo que se le pasa el socket id

//   Bun.serve<{ socketId: number }>({
//     fetch(req, server) {
//       const success = server.upgrade(req, {
//         data: {
//           socketId: Math.random(),
//         },
//       });
//       if (success) return undefined;
  
//       // handle HTTP request normally
//       // ...
//     },
//     websocket: {
//       // define websocket handlers
//       async message(ws, message) {
//         // the contextual dta is available as the `data` property
//         // on the WebSocket instance
//         console.log(`Received ${message} from ${ws.data.socketId}}`);
//       },
//     },
//   });


//PROCEDIMIENTO

//   Las pruebas las he hecho desde la consola del browser: 

//   nos suscribimos

//   const socket = new WebSocket('ws://localhost:3000');  creamos el socket
//   socket.onopen = function() {
//     socket.send(JSON.stringify({ action: "subscribe", group: "darkchat" }));
// }; 

// creamos otro 
// const socket2 = new WebSocket('ws://localhost:3000');
// socket2.onopen = function() {
//     socket.send(JSON.stringify({ action: "subscribe", group: "darkchat" }));
// };


// en esta situacion veremos como la paersona ha entrado en el chat

// nos enviamos mensajes usando socket.send("bla bla") y socket2.send("bla bla")

// vemos como lo recibe los 2 websocket

// añadimos la funcion del onclose para el unsubscribe
// socket.onclose= function() {
//     socket.send(JSON.stringify({ action: "unsubscribe", group: "darkchat" }));
// };

// hacemos socket.close() y veremos como en el otro canal de websocket sale "adsd left the chat"






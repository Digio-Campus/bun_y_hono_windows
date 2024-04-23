let socketId = 0;

const server = Bun.serve({
  hostname: "192.168.0.112",
  port: 80,
  fetch(req, server) {
    const success = server.upgrade(req);
    if (success) return undefined;
    return new Response("Hey");
  },
  websocket: {
    open(ws) {
      ws.id = socketId++;
      const msg = `${socketId} has entered the board`;
      ws.subscribe("canvas");
      server.publish("canvas", msg);
    },
    message(ws, message) {
      const data = JSON.parse(message);
      if (data.request === 'socketId') {
        ws.send(JSON.stringify({ request: 'socketId', id: ws.id }));
        return;
      }
      server.publish("canvas", JSON.stringify({ id: ws.id, x: data.x, y: data.y, clientDraw: data.clientDraw }))
    },
    close(ws) {
      const msg = `${socketId} has left the board`;
      server.publish("canvas", msg);
      ws.unsubscribe("canvas");
    },
  },
});

console.log(`Listening on ${server.hostname}:${server.port}`);




// let socketId = 0;
// const server = Bun.serve({
//   fetch(req, server) {
//     const success = server.upgrade(req);
//     if (success) return undefined;

//     return new Response("Hello world");
//   },
//   websocket: {
//     open(ws) {
//       ws.id = socketId++;
//       const msg = `${socketId} has entered the board`;
//       ws.subscribe("canvas");
//       server.publish("canvas", msg);
//     },
//     message(ws, message) {
//       const data = JSON.parse(message);
//       if (data.request === 'socketId') {
//         ws.send(JSON.stringify({ request: 'socketId', id: ws.id }));
//         return;
//       }
//       server.publish("canvas", JSON.stringify({ id: ws.id, x: data.x, y: data.y }))
//     },
//     close(ws) {
//       const msg = `${socketId} has left the board`;
//       server.publish("canvas", msg);
//       ws.unsubscribe("canvas");
//     },
//   },
// });

// console.log(`Listening on ${server.hostname}:${server.port}`);
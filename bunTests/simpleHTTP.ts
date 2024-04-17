

//Responde a todas las requests en Response con status 200 y body "welcome to bun" 


// C:\Users\Victor>curl -i http://127.0.0.1:3000      <----- curl en CLI

//RESPUESTA:
// HTTP/1.1 200 OK
// content-type: text/plain;charset=utf-8
// Date: Wed, 17 Apr 2024 12:36:11 GMT
// Content-Length: 15
const server = Bun.serve({
    port: 3000,
    fetch(request) {
      return new Response("Welcome to Bun!");
    },
  });
  console.log(`Listening on ${server.url}`);
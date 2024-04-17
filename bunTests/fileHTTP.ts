//Ruta del fichero local a leer
const path = "./info.txt";

//Te devuelve una instancia BunFile que se le puede pasar al constructor del response
const file = Bun.file(path);

console.log(new Response(Bun.file("./package.json")).headers.get("Content-Type"));
// => application/json;charset=utf-8

console.log(new Response(Bun.file("./info.txt")).headers.get("Content-Type"));
// => text/plain;charset=utf-8

console.log(new Response(Bun.file("./index.tsx")).headers.get("Content-Type"));
// => text/javascript;charset=utf-8

console.log(new Response(Bun.file("./img.png")).headers.get("Content-Type"));
// => image/png

Bun.serve({
    async fetch(req) {
    //   const path2 = new URL(req.url).pathname;
    //   const file = Bun.file(path2);
      return new Response(file);
    },
  });
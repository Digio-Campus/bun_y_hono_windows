//Iniciamos servidor con el comando bun --hot run hotreload.ts
//con esto, cada vez que guadamos el archivo se actualiza sin necesidad de parar sel servidor y volverlo a arrancar
// OJO: Solo se recarga la parte del servidor, por lo que si queremos ver actualizado la variable count desde el browser tenemos que actualizar nosotros, la diferencia es que podemos modificar el fichero sin necesidad te resetear el run para que funcione.
  declare global {
    var count: number;
  }
  
  globalThis.count ??= 0;
  globalThis.count++;
  
  Bun.serve({
    fetch(req: Request) {
      return new Response(`Reloaded ${globalThis.count} times`);
    },
    port: 3000,
  });
const server = Bun.serve({
    port: 3000,
    async fetch(req) {
      const url = new URL(req.url);
  
      if (url.pathname === "/")
      //nos devuelve un form que hemos creado
        return new Response(Bun.file("index.html"), {
          headers: {
            "Content-Type": "text/html",
          },
        });

        if (url.pathname === '/action') {
            const formdata = await req.formData();
            
            //ponemos un nombre
            const name = formdata.get('name');

            //seleccionamos una foto
            const profilePicture = formdata.get('profilePicture');

            if (!profilePicture) throw new Error('Must upload a profile picture.');
            // podemos guardar la foto que hemos metido
            await Bun.write('profilePicture.png', profilePicture);
            
            return new Response("Success");
          }
  
      return new Response("Not Found", { status: 404 });
    },
  });
  
  console.log(`Listening on http://localhost:${server.port}`);
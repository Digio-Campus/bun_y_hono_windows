// Asi es como se configura el tls con tu certificado (cert.pem) y con tu clave privada en key (key.pem)

const server = Bun.serve({
    fetch: (request) => new Response("Welcome to Bun!"),
    tls: {
      cert: Bun.file("cert.pem"),
      key: Bun.file("key.pem"),
    //   ca: [Bun.file("ca1.pem"), Bun.file("ca2.pem")],
    },
  });


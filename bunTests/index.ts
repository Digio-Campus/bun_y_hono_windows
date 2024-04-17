import figlet from "figlet";

const server = Bun.serve({
    port: 8095,
    fetch(req) {
        const body = figlet.textSync("Bun!");
        return new Response(body);
    },
});

console.log(`Listening on http://127.0.0.1:${server.port} ...`);
Bun.serve({
    //port: 8095,     //por defecto: 3000
    //hostname: miDominio  //Por defecto: localhost
    async fetch(req) {
        const path = new URL(req.url).pathname;

        if (path === "/") return new Response("Welcome to Bun!");

        //Redirecttiona la ruta .../abc y te lleva a .../source pasandole el codigo de estado de 301 (basicamente este estado indica que esta pagina(la de abc) ha sido permanentemente movida a una nueva localizacion)
        if (path === "/abc") return Response.redirect("/source", 301);


        // Si la ruta es .../source te muestra ESTE fichero
        if (path === "/source") return new Response(Bun.file(import.meta.file));

        //Simplemente te devuelve un json
        if (path === "/api") return Response.json({ some: "buns", for: "you" });



        // Recibes un JSON a través del POST y el path

        //curl -X POST -H "Content-Type: application/json" -d "{\"name\": \"John Doe\", \"age\": 30, \"city\": \"New York\"}" http://localhost:3000/api/post

        // Respuesta; 
        // Received JSON: {   
        //     name: "John Doe",
        //     age: 30,
        //     city: "New York",
        //   }
        if (req.method === "POST" && path === "/api/post") {
            const data = await req.json();
            console.log("Received JSON:", data);
            return Response.json({ success: true, data });
        }


        // Lo mismo que la anterior pero con un form

        // curl -X POST -F "someField=abcde" http://localhost:3000/form

        // respuesta:
        // abcde
        if (req.method === "POST" && path === "/form") {
            const data = await req.formData();
            console.log(data.get("someField"));
            return new Response("Success");
        }

        // Resultado por defecto en caso de no cumplir con el condicionante de ninguna de las anteriores rutas
        return new Response("404!");
    },
});



// Bun.serve({
//     fetch(req) {
//         const url = new URL(req.url);
//         const path = new URL(req.url).pathname;

//         if (path === "/") return new Response("Welcome to Bun!");
//         if (url.pathname === "/blog") return new Response("Blog!");
//         return new Response("404!");
//     },
// });
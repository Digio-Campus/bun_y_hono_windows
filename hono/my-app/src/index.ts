import { Hono } from 'hono'

const app = new Hono()
app.get('/', (c) => c.text('Hello Bun!'))

//para elegir el puerto, (por defecto es 3000)
export default { 
  port: 3000, 
  fetch: app.fetch, 
} 


//export default app //todo por defecto



//Para gestionar static files
// import { serveStatic } from 'hono/bun'

// const app = new Hono()

// app.use('/static/*', serveStatic({ root: './' }))
// app.use('/favicon.ico', serveStatic({ path: './favicon.ico' }))
// app.get('/', (c) => c.text('You can access: /static/hello.txt'))
// app.get('*', serveStatic({ path: './static/fallback.txt' }))


// Este deberia de ser la estructura para que funcione 
// ./
// ├── favicon.ico
// ├── index.ts
// └── static
//     ├── demo
//     │   └── index.html
//     ├── fallback.txt
//     ├── hello.txt
//     └── images
//         └── dinotocat.png



// rewriteRequestPath
// If you want to map http://localhost:3000/static/* to ./statics, you can use the rewriteRequestPath option:

// ts
// app.get(
//   '/static/*',
//   serveStatic({
//     root: './',
//     rewriteRequestPath: (path) => path.replace(/^\/static/, '/statics'),
//   })
// )




// mimes
// You can add MIME types with mimes:

// ts
// app.get(
//   '/static/*',
//   serveStatic({
//     mimes: {
//       m3u8: 'application/vnd.apple.mpegurl',
//       ts: 'video/mp2t',
//     }
//   })
// )





// onNotFound
// You can specify handling when the requested file is not found with onNotFound:

// ts
// app.get(
//   '/static/*',
//   serveStatic({
//     onNotFound: (path, c) => {
//       console.log(`${path} is not found, you access ${c.req.path}`)
//     },
//   })
// )
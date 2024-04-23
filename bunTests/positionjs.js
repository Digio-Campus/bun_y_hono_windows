document.addEventListener('DOMContentLoaded', function () {
    const canvas = document.getElementById('canvas');
    const ctx = canvas.getContext('2d');

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    let clients = {};
    let isDrawing = false;

    var clientId = undefined

    canvas.addEventListener('mousedown', function (e) {
        isDrawing = true;
    });

    canvas.addEventListener('mousemove', function (e) {
        // sendData(e.clientX, e.clientY);
        sendData(e.clientX, e.clientY, isDrawing);
        // if (isDrawing) {
            
        // }
    });

    canvas.addEventListener('mouseup', function (e) {
        isDrawing = false;
    });

    const ws = new WebSocket('ws://127.0.0.1:3000');

    ws.onopen = function () {
        ws.send(JSON.stringify({ request: 'socketId' }));
    };

    ws.onmessage = function (event) {
        const data = JSON.parse(event.data);
        if (data.request === 'socketId') {
            clientId = data.id;
        } else {
            clients[data.id] = { x: data.x, y: data.y };
            // if (data.id === clientId) {
            //     ctx.fillRect(data.x, data.y, 5, 5);
            // }

            if (data.clientDraw === true ) {
                ctx.fillRect(data.x, data.y, 5, 5);
            }


            drawClients();
        }
        // console.log(data.)

        // if (isDrawing) {
        //     ctx.fillRect(data.x, data.y, 5, 5); 
        // }
        
    };

    function sendData(x, y, isDrawingg) {
        ws.send(JSON.stringify({ x: x, y: y, clientDraw: isDrawingg}));
    }

    let clientDivs = {};

    function drawClients() {
        // ctx.clearRect(0, 0, canvas.width, canvas.height);
        // document.getElementById('clients-container').innerHTML = ""
        // clientDivs = {}
        for (let id in clientDivs) {
            document.getElementById('clients-container').removeChild(clientDivs[id]);
            delete clientDivs[id];
        }

        for (let id in clients) {
            // ctx.clearRect(clients[id].x - 10, clients[id].y - 20, 100, 30);
            // ctx.fillText("Client ID: " + id, clients[id].x, clients[id].y);

            const clientDiv = document.createElement('div');

            clientDiv.id = `client-${id}`;
            clientDiv.className = 'client';
            clientDiv.textContent = `Client ID: ${id}`;
            clientDiv.style.position = 'absolute';
            clientDiv.style.left = (clients[id].x + 50) + 'px';
            clientDiv.style.top = (clients[id].y + 50) + 'px';
            clientDiv.style.zIndex = 100;

            document.getElementById('clients-container').appendChild(clientDiv);
            clientDivs[id] = clientDiv;
        }
    }
});



// document.addEventListener('DOMContentLoaded', function () {
//     const canvas = document.getElementById('canvas');
//     const ctx = canvas.getContext('2d');

//     canvas.width = window.innerWidth;
//     canvas.height = window.innerHeight;

//     let clients = {};
//     let isDrawing = false;

//     var clientId = undefined

//     canvas.addEventListener('mousedown', function (e) {
//         isDrawing = true;
//     });

//     canvas.addEventListener('mousemove', function (e) {
//         // sendData(e.clientX, e.clientY);
//         sendData(e.clientX, e.clientY);
//         // if (isDrawing) {
            
//         // }
//     });

//     canvas.addEventListener('mouseup', function (e) {
//         isDrawing = false;
//     });

//     const ws = new WebSocket('ws://127.0.0.1:3000');

//     ws.onopen = function () {
//         ws.send(JSON.stringify({ request: 'socketId' }));
//     };

//     ws.onmessage = function (event) {
//         const data = JSON.parse(event.data);
//         if (data.request === 'socketId') {
//             clientId = data.id;
//         } else {
//             clients[data.id] = { x: data.x, y: data.y };
//             // if (data.id === clientId) {
//             //     ctx.fillRect(data.x, data.y, 5, 5);
//             // }
//             drawClients();
//         }

//         if (isDrawing) {
//             ctx.fillRect(data.x, data.y, 5, 5); 
//         }
        
//     };

//     function sendData(x, y) {
//         ws.send(JSON.stringify({ x: x, y: y}));
//     }

//     let clientDivs = {};

//     function drawClients() {
//         // ctx.clearRect(0, 0, canvas.width, canvas.height);
//         // document.getElementById('clients-container').innerHTML = ""
//         // clientDivs = {}
//         for (let id in clientDivs) {
//             document.getElementById('clients-container').removeChild(clientDivs[id]);
//             delete clientDivs[id];
//         }

//         for (let id in clients) {
//             // ctx.clearRect(clients[id].x - 10, clients[id].y - 20, 100, 30);
//             // ctx.fillText("Client ID: " + id, clients[id].x, clients[id].y);

//             const clientDiv = document.createElement('div');

//             clientDiv.id = `client-${id}`;
//             clientDiv.className = 'client';
//             clientDiv.textContent = `Client ID: ${id}`;
//             clientDiv.style.position = 'absolute';
//             clientDiv.style.left = (clients[id].x + 10) + 'px';
//             clientDiv.style.top = (clients[id].y + 10) + 'px';
//             clientDiv.style.zIndex = 100;

//             document.getElementById('clients-container').appendChild(clientDiv);
//             clientDivs[id] = clientDiv;
//         }
//     }
// });
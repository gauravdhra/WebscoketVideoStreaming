import { WebSocket } from 'ws';
// const WebSocket = require('ws');
const fs = require('fs');
const express = require('express')
const app = express()
const port = 3000
const wsPort = 8080
const wss = new WebSocket.Server({ port: wsPort });
// put a video file "louisvideo.mp4" in this folder 
const filePath = './louisvideo.mp4'

app.get('/', (req, res) => {
    res.sendFile(__dirname+"/index.html")
});
app.get('/2', (req, res) => {
    res.sendFile(__dirname+"/indexx.html")
});

app.listen(port,function (){
    console.log(`Server is running on ${port}`)
})


wss.on('connection', function connection(ws) {
    console.log("connected");
    ws.on('message', function incoming(message) {
        const data = message.toString('utf8');
        if (data === 'sendVideo') {
            const fileStream = fs.createReadStream(filePath);

            fileStream.on('data', function (chunk) {
                
                ws.send(chunk);
            });

            fileStream.on('end', function () {
                ws.send('videoComplete');
            });
        }
    });
});

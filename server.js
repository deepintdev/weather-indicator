// Test server

"use strict";

const StaticServer = require('static-server');

const server = new StaticServer({
    rootPath: '.',            // required, the root of the server file tree
    port: 9000,               // required, the port to listen
});

server.start(function () {
    console.log('Server listening to', server.port);
})
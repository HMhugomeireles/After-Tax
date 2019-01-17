const http = require('http');
const app = require('./app');

const port = process.env.PORT || 7777;

const server = http.createServer(app);

server.listen(port, () => {
    console.log('Welcome on app After-Tax api.')
    console.log('Server start on port: ' + port)
});
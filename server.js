const express = require('express');
const http = require('http');
const socketIO = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketIO(server);

// Serve static files from the "public" directory
app.use(express.static('public'));

app.get('/favicon.ico', (req, res) => {
  // Send a 204 No Content status to prevent the 404 error
  res.status(204).end();
});


// Socket.IO connection handler
io.on('connection', (socket) => {
  console.log('A user connected');

  // Handle incoming messages
  socket.on('chat message', (message) => {
    console.log('Message received:', message);

    // Broadcast the message to all connected clients
    io.emit('chat message', message);
  });

  // Handle disconnection
  socket.on('disconnect', () => {
    console.log('A user disconnected');
  });
});

// Start the server
const port = process.env.PORT || 3000;
server.listen(process.env.PORT || 3000, () => {
  console.log(`Server listening on port ${port}`);
});


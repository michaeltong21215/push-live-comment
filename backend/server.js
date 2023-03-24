const express = require('express');
const http = require('http');
const socketIo = require('socket.io');

const app = express();

// Create a new HTTP server using the express app
const server = http.createServer(app);
const io = socketIo(server, {
  cors: {
    origin: '*',
  },
});

// Set up a WebSocket connection
io.on('connection', (socket) => {
  console.log('New client connected');

  // Listen for new comments from the client
  socket.on('newComment', (comment) => {
    console.log('New comment:', comment);

    // Broadcast the new comment to all connected clients
    io.emit('newComment', comment);
  });

  // Listen for disconnection events
  socket.on('disconnect', () => {
    console.log('Client disconnected');
  });
});

// Start the server
const port = process.env.PORT || 4000;
server.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});

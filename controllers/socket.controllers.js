const clients = new Map();
const roles = new Map(); // Maps socketId to role
const undeliveredMessages = new Map();
let io; 


function handleSocketConnection(socket, io) {
  console.log('A user connected with id ', socket.id);

  socket.on('client_id', (data) => {
    const { clientId, role } = data;
    console.log('Received client ID:', clientId , role);
    clients.set(clientId, socket.id);
    roles.set(socket.id, role);

    // Send any undelivered messages --*We will use it only for User not admin

    if (undeliveredMessages.has(clientId)) {
      console.log('undelivered sent To User' + clientId);
      const messages = undeliveredMessages.get(clientId);
      messages.forEach(message => {
        socket.emit('message_to_client', message);
      });
      undeliveredMessages.delete(clientId);
    }
  });

  socket.on('disconnect', () => {
    console.log('User disconnected');
    for (let [key, value] of clients.entries()) {
      if (value === socket.id) {
        clients.delete(key);
        break;
      }
    }
  });
}

function sendToClientById(userId, message) {
  const socketId = clients.get(userId);
  if (socketId) {
    io.to(socketId).emit('message_to_client', message);
    console.log('sent');
  } else {
    if (!undeliveredMessages.has(userId)) {
      undeliveredMessages.set(userId, []);
    }
    undeliveredMessages.get(userId).push(message);
  }
}

function sendToClientByRole(role, message) {
    for (let [socketId, clientRole] of roles.entries()) {
      if (clientRole === role) {
        console.log(role , clientRole);
        io.to(socketId).emit('message_to_client', message);
      }
    }
  }

function notifyUser (req, res) {
    const { userId, message } = req.body;
    sendToClientById(userId, message);
    res.status(200).send('Notification sent');
  };
  
function notifyUsersByRole (req, res) {
    const { role, message } = req.body;
    sendToClientByRole(role, message);
    res.status(200).send(`Notification sent to all users with role ${role}`);
  };
function initializeSocket(server) {
    io = require('socket.io')(server, {
      cors: {
        origin: '*',
        methods: ['GET', 'POST']
      }
    });
    
    io.on('connection', (socket) => {
      handleSocketConnection(socket);
      console.log('Socket intialized');
    });
  }
module.exports = {
  handleSocketConnection,
  sendToClientById,
  sendToClientByRole,
  notifyUser,
  notifyUsersByRole,
  initializeSocket
};

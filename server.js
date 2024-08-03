const http = require('http');
const app = require('./app');
const PORT = process.env.PORT || 3000;
const server = http.createServer(app);
const { pool } = require('./models/configrations');
const mongoose = require('mongoose');
const { initializeSocket } = require('./controllers/socket.controllers');


async function startServer() {
  await pool.connect().then(
    () => { console.log('Connected to PostgreSQL database'); }
  ).catch((err) => {
    console.error('Error connecting to PostgreSQL:', err.stack);
    process.exit(1);
  });

  await initializeSocket(server);

  // await mongoose
  //   .connect('mongodb+srv://omarsaad08:5RCr7kLbTk1cwiUE@cluster0.lubh9dn.mongodb.net/hr-management-system?retryWrites=true&w=majority&appName=Cluster0')
  //   .then(() => {
  //     console.log('MongoDB connected :)')
  //   })
  //   .catch((e) => console.log(`error: ${e}`));

  server.listen(PORT, '0.0.0.0', () => {
    console.log(`Listening on Port ${PORT} !`);
  });
}

startServer();

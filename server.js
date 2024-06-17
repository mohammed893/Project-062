const http = require('http');
const app = require('./app');
const PORT = process.env.PORT || 3000;
const server = http.createServer(app);
const pool = require('./models/database');
// const io = require('socket.io')(server, {
//   cors: {
//     origin: '*',
//     methods: ['GET', 'POST']
//   }
// });
const {initializeSocket} = require('./controllers/socket.controllers');


async function startServer (){
  await pool.connect().then(
    () => {console.log('Connected to PostgreSQL database');}
  ).catch((err) =>
     {console.error('Error connecting to PostgreSQL:', err.stack);
    process.exit(1);
  });

  await initializeSocket(server);

  server.listen(PORT, () => {
        console.log(`Listening on Port ${PORT} !`);
    });
}

startServer();

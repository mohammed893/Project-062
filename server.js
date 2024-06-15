const http = require('http');
const app = require('./app');
const PORT = process.env.PORT || 3000;
const server = http.createServer(app);
const pool = require('./models/database');

async function startServer (){
  await pool.connect().then(
    () => {console.log('Connected to PostgreSQL database');}
  ).catch((err) =>
     {console.error('Error connecting to PostgreSQL:', err.stack);
    process.exit(1);
  });
    server.listen(PORT, () => {
        console.log(`Listening on Port ${PORT} !`);
    });
    
}

startServer();

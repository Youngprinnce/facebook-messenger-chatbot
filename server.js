const { createServer } = require('http');
const app = require('./src/app');
const { PORT } = require('./src/config/config');

// Spin server
const server = createServer(app);
server.listen(PORT, () => console.log(`Backend Server Started on port ${PORT}`));

// Handle uncaught exceptions
process.on('uncaughtException', (err) => {
//   logger.log({
//     level: 'error',
//     message: err.message,
//   });
  console.log('Shutting down due to uncaught exception');
  // Close server & exit process
  server.close(() => process.exit(1));
});

// Handle unhandled promise rejections
process.on('unhandledRejection', (err) => {
//   logger.log({
//     level: 'error',
//     message: err.message,
//   });
  // Close server & exit process
  console.log('Shutting down the server due to Unhandled Promise rejection');
  server.close(() => process.exit(1));
});

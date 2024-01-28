import mongoose from 'mongoose';
import config from './config';
import app from './app';
import { Server } from 'http';

process.on('uncaughtException', error => {
  console.log('uncaught exception is detected', error);
  process.exit(1);
});

let server: Server;

async function main() {
  try {
    await mongoose.connect(config.database_url as string);
    console.log('database connected successfully');

    server = app.listen(config.port, () => {
      console.log(`Application listening on port ${config.port}`);
    });
  } catch (error) {
    console.log('failed to connect database', error);
  }
  process.on('unhandledRejection', error => {
    if (server) {
      console.log(
        'Unhandled rejection is detected so we are closing our server',
      );
      server.close(() => {
        console.log(error);
        process.exit(1);
      });
    } else {
      process.exit(1);
    }
  });
}

main();

process.on('SIGTERM', () => {
  console.log('SIGTERM is received');
  if (server) {
    server.close();
  }
});

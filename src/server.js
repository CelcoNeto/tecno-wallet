import http from 'http';
import app from './app';
import './bootstrap';
const { APP_PORT } = process.env;

const server = http.createServer(app);

server.listen(APP_PORT);

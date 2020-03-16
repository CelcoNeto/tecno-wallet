import http from 'http';
import app from './app';
import './bootstrap';

const server = http.createServer(app);

server.listen(process.env.APP_PORT);

import express from 'express';
import path from 'path';
import fs from 'fs';
import { preloadAll } from '@react-loadable/revised';
import useragent from 'express-useragent';
import cookieParser from 'cookie-parser';
import { router } from './router';
import https from 'https';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(
  '/build',
  express.static(
    path.resolve(__dirname, '../build/public/')
  ));

app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(useragent.express());

app.use('/', router);

const keyPath = path.resolve(__dirname, '../build/cert');
const pubKeyPath = path.join(keyPath, 'key.pem');
const pubCertPath = path.join(keyPath, 'cert.pem');

const startServer = () => {
  preloadAll().then(() => {
    console.log(`Server Client SSR started on port ${PORT}`);
  });
};

if (fs.existsSync(pubKeyPath) && fs.existsSync(pubCertPath)) {
  const key = fs.readFileSync(pubKeyPath);
  const cert = fs.readFileSync(pubCertPath);
  const server = https.createServer({ key, cert }, app);
  preloadAll().then(() => {
    server.listen(PORT, () => {
      console.log(`HTTPS Server Client SSR started on port ${PORT}`);
    });
  });
} else {
  console.warn('[server] TLS key or certificate not found, starting HTTP server instead');
  // start HTTP server if TLS files are missing
  startServer();
  app.listen(PORT, () => {
    console.log(`HTTP Server Client SSR started on port ${PORT}`);
  });
}

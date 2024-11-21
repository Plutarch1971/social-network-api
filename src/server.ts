import express, { Express } from 'express';
import db from './config/connection.js';
import routes from './routes/index.js';

await db();
const app = express();
const PORT = 3001

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(routes);

app.use((req, _res, next) => {
    console.log('Incoming request path:', req.path);
    console.log('Incoming request URL:', req.url);
    next();
});
app.listen(PORT, () => {
    console.log(`API server running on port ${PORT}!`);
});

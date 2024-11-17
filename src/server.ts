import express, { Express } from 'express';
import db from './config/connection';
import routes from './routes/api';


const app = express();
const PORT = 3001

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(routes);

db.once('open', () => {
    app.listen(PORT, () => {
        console.log(`API server running on port ${PORT}!`);
    });
});
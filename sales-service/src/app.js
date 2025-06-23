import express, { json, urlencoded } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import router from './routes/index.js';
import {connectDB} from './config/database.js';

const app = express();

// Conectar a la base de datos
connectDB();

// Middlewares
app.use(helmet());
app.use(cors());
app.use(json({ limit: '10mb' }));
app.use(urlencoded({ extended: true }));

// Rutas
app.use('/api', router);

export default app;
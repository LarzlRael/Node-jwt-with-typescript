import express from 'express'




import { Application } from 'express-serve-static-core';
import indexRoutes from './routes/indexRouter';

import morgan from 'morgan';
const app: Application = express();
//settings
app.set('port', 4000);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
//middelwares

app.use(morgan('dev'));
app.use(indexRoutes);

export default app;

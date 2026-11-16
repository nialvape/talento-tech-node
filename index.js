import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';

import productsRouter from './src/routes/products.routes.js';
import authRouter from './src/routes/auth.routes.js';
import { notFound } from './src/middlewares/notFound.middleware.js';
import { errorHandler } from './src/middlewares/error.middleware.js';

const app = express();
const PORT = process.env.PORT ?? 3000;

app.use(cors());
app.use(bodyParser.json());

app.get('/', (req, res) => {
    res.json({ message: 'API de productos - Talento Tech' });
});

app.use('/api/products', productsRouter);
app.use('/auth', authRouter);

app.use(notFound);
app.use(errorHandler);

// En Vercel la app corre como función serverless: no hay que levantar el servidor.
if (!process.env.VERCEL) {
    app.listen(PORT, () => console.log(`Servidor corriendo en http://localhost:${PORT}`));
}

export default app;

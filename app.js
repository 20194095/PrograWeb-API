import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';

// Importar rutas
import authRoutes from './src/routes/authRoutes.js';
import userRoutes from './src/routes/userRoutes.js';
import productRoutes from './src/routes/productRoutes.js';
import cartRoutes from './src/routes/cartRoutes.js';
import orderRoutes from './src/routes/orderRoutes.js';
import adminRoutes from './src/routes/adminRoutes.js';

const app = express();

// Middleware para analizar el cuerpo de las solicitudes y habilitar CORS
app.use(bodyParser.json());
app.use(cors());

// Rutas
app.get('/', (req, res) => {
    res.send('Bienvenido a la API de E-commerce');
});

app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/products', productRoutes);
app.use('/api/cart', cartRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/admin', adminRoutes);

export default app;

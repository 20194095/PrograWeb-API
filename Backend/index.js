import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import productRoutes from './src/routes/productRoutes.js';
import userRoutes from './src/routes/userRoutes.js';
import cartRoutes from './src/routes/cartRoutes.js';
import orderRoutes from './src/routes/orderRoutes.js';
const app = express();

app.use(bodyParser.json());
app.use(cors());

app.use('/products', productRoutes);
app.use('/users', userRoutes);
app.use('/carts', cartRoutes);
app.use('/orders', orderRoutes);

app.get('/', (req, res) => {
  res.send('API de Comercio Electrónico');
});

app.listen(4000, () => {
  console.log('Servidor corriendo en el puerto 4000');
});

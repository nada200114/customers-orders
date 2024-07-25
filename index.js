import express from 'express';
import customerRouter from './src/modules/customer/customer.routes.js';
import productRouter from './src/modules/product/product.routes.js';
import orderRouter from './src/modules/order/order.routes.js';
import connection from './db/connection.js';
const port=3000;
const app = express();
app.use(express.json())

app.use('/customers',customerRouter);
app.use('/products',productRouter);
app.use('/orders',orderRouter);

app.listen(port,() =>{
  console.log(`listening on port 3000`)  
} );
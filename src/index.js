import express from "express";
import { connectToMongoDB } from "./database/mongo.js";
import productRouter from "./routes/product-routes.js";
const app = express();
const port = 3000;

connectToMongoDB()

app.use(express.json());


app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.use('/products', productRouter);



app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});
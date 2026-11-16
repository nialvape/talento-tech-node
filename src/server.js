import 'dotenv/config';
import express from 'express';

const BASE_URL = process.env.FAKEAPI_BASE_URL ?? "https://fakestoreapi.com";

const app = express();
app.use(express.json());

app.get('/products', async (req, res) => {
    const response = await fetch(`${BASE_URL}/products`);
    const data = await response.json();
    res.json(data);
});
  

app.get('/products/:id', async (req, res) => {
    const { id } = req.params;
    const response = await fetch(`${BASE_URL}/products/${id}`);
    const data = await response.json();
    res.json(data);
});


app.post('/products', async (req, res) => {
    const { title, price, category } = req.body;
    const response = await fetch(`${BASE_URL}/products`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title, price, category})
    });
    const data = await response.json();
    res.status(201).json(data);
});


app.delete('/products/:id', async (req, res) => {
    const { id } = req.params;
    const response = await fetch(`${BASE_URL}/products/${id}`, { method: 'DELETE' });
    const data = await response.json();
    res.json(data);
});


export default app;
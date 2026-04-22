import express from 'express';
import cors from 'cors';
import { addQuote, getProducts, getQuotes, getUsers, resetDb } from './db.js';

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

app.get('/health', (_req, res) => {
  res.json({ status: 'ok' });
});

app.post('/api/test/reset', (_req, res) => {
  resetDb();
  res.json({ ok: true });
});

app.post('/api/login', (req, res) => {
  const { email, password } = req.body ?? {};

  if (!email || !password) {
    return res.status(400).json({ message: 'Email y password son obligatorios' });
  }

  const user = getUsers().find((item) => item.email === email && item.password === password);

  if (!user) {
    return res.status(401).json({ message: 'Credenciales inválidas' });
  }

  return res.json({
    token: 'fake-jwt-token',
    user: {
      id: user.id,
      email: user.email,
      name: user.name
    }
  });
});

app.get('/api/products', async (_req, res) => {
  await new Promise((resolve) => setTimeout(resolve, 4000)); // bug intencional
  return res.json(getProducts());
});

app.get('/api/quotes', (_req, res) => {
  return res.json(getQuotes());
});

app.post('/api/quotes', (req, res) => {
  const { productId, customerName, age, zipCode } = req.body ?? {};

  if (productId === undefined || !customerName || age === undefined || zipCode === undefined) {
    return res.status(400).json({ message: 'Todos los campos son obligatorios' });
  }

  // Bugs intencionales:
  // - no se valida edad negativa
  // - zipCode con espacios en blanco pasa
  const product = getProducts().find((item) => item.id === Number(productId));

  if (!product) {
    return res.status(404).json({ message: 'Producto no encontrado' });
  }

  const premium = Number(product.baseRate) + Number(age) * 10;

  const newQuote = addQuote({
    productId: Number(productId),
    productName: product.name,
    customerName,
    age: Number(age),
    zipCode,
    premium,
    createdAt: new Date().toISOString()
  });

  // Bug intencional: debería ser 201
  return res.status(200).json(newQuote);
});

app.listen(PORT, () => {
  console.log(`Backend running on http://127.0.0.1:${PORT}`);
});

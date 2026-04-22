import React, { useEffect, useState } from 'react';
import { createRoot } from 'react-dom/client';

const API_URL = 'http://127.0.0.1:3001';

function App() {
  const [screen, setScreen] = useState('login');
  const [loginData, setLoginData] = useState({ email: '', password: '' });
  const [loginMessage, setLoginMessage] = useState('');
  const [products, setProducts] = useState([]);
  const [quotes, setQuotes] = useState([]);
  const [quoteData, setQuoteData] = useState({
    productId: '1',
    customerName: '',
    age: '',
    zipCode: ''
  });
  const [quoteMessage, setQuoteMessage] = useState('');
  const [loadingProducts, setLoadingProducts] = useState(false);

  useEffect(() => {
    if (screen === 'quotes') {
      loadProducts();
      loadQuotes();
    }
  }, [screen]);

  async function loadProducts() {
    setLoadingProducts(true);
    try {
      const response = await fetch(`${API_URL}/api/products`);
      const data = await response.json();
      setProducts(data);
    } finally {
      setLoadingProducts(false);
    }
  }

  async function loadQuotes() {
    const response = await fetch(`${API_URL}/api/quotes`);
    const data = await response.json();
    setQuotes(data);
  }

  async function handleLogin(event) {
    event.preventDefault();
    setLoginMessage('');

    const response = await fetch(`${API_URL}/api/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(loginData)
    });

    const data = await response.json();

    if (!response.ok) {
      // Bug intencional: mensaje incorrecto
      setLoginMessage('Usuario creado exitosamente');
      return;
    }

    localStorage.setItem('qa-token', data.token);
    setScreen('quotes');
  }

  async function handleCreateQuote(event) {
    event.preventDefault();
    setQuoteMessage('');

    const response = await fetch(`${API_URL}/api/quotes`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        productId: Number(quoteData.productId),
        customerName: quoteData.customerName,
        age: Number(quoteData.age),
        zipCode: quoteData.zipCode
      })
    });

    if (!response.ok) {
      const errorData = await response.json();
      setQuoteMessage(errorData.message || 'Error al crear cotización');
      return;
    }

    setQuoteMessage('Cotización creada exitosamente');
    setQuoteData({ productId: '1', customerName: '', age: '', zipCode: '' });

    // Bug intencional: no refresca tabla tras guardar
    // await loadQuotes();
  }

  const selectedProduct = products.find((item) => String(item.id) === quoteData.productId);

  return (
    <div style={{ fontFamily: 'Arial, sans-serif', padding: 24, maxWidth: 960, margin: '0 auto' }}>
      <h1>QA Automation Challenge</h1>
      {screen === 'login' ? (
        <section>
          <h2>Iniciar sesión</h2>
          <form onSubmit={handleLogin} style={{ display: 'grid', gap: 12, maxWidth: 360 }}>
            <label>
              Email
              <input
                data-testid="login-email"
                type="email"
                value={loginData.email}
                onChange={(event) => setLoginData({ ...loginData, email: event.target.value })}
                style={{ width: '100%', padding: 8 }}
              />
            </label>
            <label>
              Password
              <input
                data-testid="login-password"
                type="password"
                value={loginData.password}
                onChange={(event) => setLoginData({ ...loginData, password: event.target.value })}
                style={{ width: '100%', padding: 8 }}
              />
            </label>
            <button data-testid="login-submit" type="submit" style={{ padding: 10 }}>
              Entrar
            </button>
          </form>
          {loginMessage ? (
            <p data-testid="login-message" style={{ color: 'crimson', marginTop: 12 }}>
              {loginMessage}
            </p>
          ) : null}
        </section>
      ) : (
        <section>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <h2>Nueva cotización</h2>
            <button data-testid="logout-button" onClick={() => setScreen('login')}>
              Salir
            </button>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24 }}>
            <form onSubmit={handleCreateQuote} style={{ display: 'grid', gap: 12 }}>
              <label>
                Producto
                <select
                  data-testid="quote-product"
                  value={quoteData.productId}
                  onChange={(event) => setQuoteData({ ...quoteData, productId: event.target.value })}
                  style={{ width: '100%', padding: 8 }}
                >
                  {products.map((product) => (
                    <option key={product.id} value={product.id}>
                      {product.name}
                    </option>
                  ))}
                </select>
              </label>

              <label>
                Nombre del cliente
                <input
                  data-testid="quote-customer-name"
                  value={quoteData.customerName}
                  onChange={(event) => setQuoteData({ ...quoteData, customerName: event.target.value })}
                  style={{ width: '100%', padding: 8 }}
                />
              </label>

              <label>
                Edad
                <input
                  data-testid="quote-age"
                  type="number"
                  value={quoteData.age}
                  onChange={(event) => setQuoteData({ ...quoteData, age: event.target.value })}
                  style={{ width: '100%', padding: 8 }}
                />
              </label>

              <label>
                Código postal
                <input
                  data-testid="quote-zip-code"
                  value={quoteData.zipCode}
                  onChange={(event) => setQuoteData({ ...quoteData, zipCode: event.target.value })}
                  style={{ width: '100%', padding: 8 }}
                />
              </label>

              <button data-testid="quote-submit" type="submit" style={{ padding: 10 }}>
                Crear cotización
              </button>

              {selectedProduct ? (
                <p data-testid="selected-product-info">
                  Prima base estimada: <strong>{selectedProduct.baseRate}</strong>
                </p>
              ) : null}

              {quoteMessage ? (
                <p data-testid="quote-message" style={{ color: 'green' }}>
                  {quoteMessage}
                </p>
              ) : null}
            </form>

            <div>
              <h3>Productos</h3>
              {loadingProducts ? <p data-testid="products-loading">Cargando productos...</p> : null}
              <ul data-testid="products-list">
                {products.map((product) => (
                  <li key={product.id}>{product.name}</li>
                ))}
              </ul>

              <h3>Historial de cotizaciones</h3>
              <table data-testid="quotes-table" border="1" cellPadding="8" style={{ borderCollapse: 'collapse', width: '100%' }}>
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Cliente</th>
                    <th>Producto</th>
                    <th>CP</th>
                    <th>Prima</th>
                  </tr>
                </thead>
                <tbody>
                  {quotes.map((quote) => (
                    <tr key={quote.id}>
                      <td>{quote.id}</td>
                      <td>{quote.customerName}</td>
                      <td>{quote.productName}</td>
                      <td>{quote.zipCode}</td>
                      <td>{quote.premium}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>
      )}
    </div>
  );
}

createRoot(document.getElementById('root')).render(<App />);

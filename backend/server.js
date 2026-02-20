const express = require('express');
const cors = require('cors');
const db = require('./db');

const app = express();
const PORT = 3000;

// Middleware
app.use(cors());
app.use(express.json());

// ==================== ROUTES ====================

// ✅ Get all products
app.get('/api/products', (req, res) => {
  const query = 'SELECT * FROM products';
  db.query(query, (err, results) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json(results);
  });
});

// ✅ Get product by ID
app.get('/api/products/:id', (req, res) => {
  const query = 'SELECT * FROM products WHERE id = ?';
  db.query(query, [req.params.id], (err, results) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    if (results.length === 0) {
      return res.status(404).json({ message: 'Product not found' });
    }
    res.json(results[0]);
  });
});

// ✅ User Login
app.post('/api/login', (req, res) => {
  const { email, password } = req.body;
  const query = 'SELECT * FROM users WHERE email = ? AND password = ?';
  
  db.query(query, [email, password], (err, results) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    if (results.length === 0) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }
    res.json({ message: 'Login successful', user: results[0] });
  });
});

// ✅ Get cart items for a user
app.get('/api/cart/:userId', (req, res) => {
  const query = `
    SELECT c.id, c.product_id, c.quantity, p.name, p.price, p.image
    FROM cart c
    JOIN products p ON c.product_id = p.id
    WHERE c.user_id = ?
  `;
  db.query(query, [req.params.userId], (err, results) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json(results);
  });
});

// ✅ Add item to cart
app.post('/api/cart', (req, res) => {
  const { userId, productId, quantity } = req.body;
  
  // Check if item already exists in cart
  const checkQuery = 'SELECT * FROM cart WHERE user_id = ? AND product_id = ?';
  db.query(checkQuery, [userId, productId], (err, results) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    
    if (results.length > 0) {
      // Update quantity
      const updateQuery = 'UPDATE cart SET quantity = quantity + ? WHERE user_id = ? AND product_id = ?';
      db.query(updateQuery, [quantity, userId, productId], (err) => {
        if (err) {
          return res.status(500).json({ error: err.message });
        }
        res.json({ message: 'Cart updated successfully' });
      });
    } else {
      // Insert new item
      const insertQuery = 'INSERT INTO cart (user_id, product_id, quantity) VALUES (?, ?, ?)';
      db.query(insertQuery, [userId, productId, quantity], (err) => {
        if (err) {
          return res.status(500).json({ error: err.message });
        }
        res.json({ message: 'Item added to cart' });
      });
    }
  });
});

// ✅ Update cart item quantity
app.put('/api/cart/:id', (req, res) => {
  const { quantity } = req.body;
  const query = 'UPDATE cart SET quantity = ? WHERE id = ?';
  
  db.query(query, [quantity, req.params.id], (err) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json({ message: 'Cart item updated' });
  });
});

// ✅ Remove item from cart
app.delete('/api/cart/:id', (req, res) => {
  const query = 'DELETE FROM cart WHERE id = ?';
  db.query(query, [req.params.id], (err) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json({ message: 'Item removed from cart' });
  });
});

// ✅ Create order
app.post('/api/orders', (req, res) => {
  const { userId, totalAmount, items } = req.body;
  
  const orderQuery = 'INSERT INTO orders (user_id, total_amount, order_date) VALUES (?, ?, NOW())';
  db.query(orderQuery, [userId, totalAmount], (err, result) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    
    const orderId = result.insertId;
    
    // Insert order items
    const itemsQuery = 'INSERT INTO order_items (order_id, product_id, quantity, price) VALUES ?';
    const values = items.map(item => [orderId, item.productId, item.quantity, item.price]);
    
    db.query(itemsQuery, [values], (err) => {
      if (err) {
        return res.status(500).json({ error: err.message });
      }
      
      // Clear cart
      const clearCartQuery = 'DELETE FROM cart WHERE user_id = ?';
      db.query(clearCartQuery, [userId], (err) => {
        if (err) {
          return res.status(500).json({ error: err.message });
        }
        res.json({ message: 'Order placed successfully', orderId });
      });
    });
  });
});

// ✅ Get user's order history
app.get('/api/orders/:userId', (req, res) => {
  const query = `
    SELECT o.id, o.total_amount, o.order_date, o.status,
           oi.product_id, oi.quantity, oi.price, p.name, p.image
    FROM orders o
    LEFT JOIN order_items oi ON o.id = oi.order_id
    LEFT JOIN products p ON oi.product_id = p.id
    WHERE o.user_id = ?
    ORDER BY o.order_date DESC
  `;
  db.query(query, [req.params.userId], (err, results) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json(results);
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});

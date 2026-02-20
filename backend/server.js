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

// ✅ Get all orders for employee dashboard (MUST be before :userId route)
app.get('/api/orders/all', (req, res) => {
  const query = `
    SELECT o.id, o.user_id, o.total_amount, o.status, o.order_date,
           u.name as customer_name,
           GROUP_CONCAT(CONCAT(p.name, ' (x', oi.quantity, ')') SEPARATOR ', ') as items
    FROM orders o
    JOIN users u ON o.user_id = u.id
    LEFT JOIN order_items oi ON o.id = oi.order_id
    LEFT JOIN products p ON oi.product_id = p.id
    GROUP BY o.id, o.user_id, o.total_amount, o.status, o.order_date, u.name
    ORDER BY o.order_date DESC
  `;
  
  db.query(query, (err, results) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json(results);
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

// ==================== BILLS ====================

// ✅ Create bill after order
app.post('/api/bills', (req, res) => {
  const { orderId, userId, customerName, items, subtotal, tax, total, paymentStatus } = req.body;
  
  const billQuery = `INSERT INTO bills (order_id, user_id, customer_name, subtotal, tax, total, payment_status, created_at) 
                     VALUES (?, ?, ?, ?, ?, ?, ?, NOW())`;
  
  db.query(billQuery, [orderId, userId, customerName, subtotal, tax, total, paymentStatus], (err, result) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    
    const billId = result.insertId;
    
    // Insert bill items
    const itemsQuery = 'INSERT INTO bill_items (bill_id, product_name, quantity, price, subtotal) VALUES ?';
    const values = items.map(item => [billId, item.productName, item.quantity, item.price, item.subtotal]);
    
    db.query(itemsQuery, [values], (err) => {
      if (err) {
        return res.status(500).json({ error: err.message });
      }
      res.json({ message: 'Bill created successfully', billId });
    });
  });
});

// ✅ Get bill by order ID
app.get('/api/bills/:orderId', (req, res) => {
  const billQuery = `
    SELECT b.*, bi.product_name, bi.quantity, bi.price, bi.subtotal
    FROM bills b
    LEFT JOIN bill_items bi ON b.id = bi.bill_id
    WHERE b.order_id = ?
  `;
  
  db.query(billQuery, [req.params.orderId], (err, results) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    
    if (results.length === 0) {
      return res.status(404).json({ message: 'Bill not found' });
    }
    
    // Format the response
    const bill = {
      id: results[0].id,
      orderId: results[0].order_id,
      userId: results[0].user_id,
      customerName: results[0].customer_name,
      subtotal: parseFloat(results[0].subtotal),
      tax: parseFloat(results[0].tax),
      total: parseFloat(results[0].total),
      paymentStatus: results[0].payment_status,
      createdAt: results[0].created_at,
      items: results.map(row => ({
        productName: row.product_name,
        quantity: row.quantity,
        price: parseFloat(row.price),
        subtotal: parseFloat(row.subtotal)
      }))
    };
    
    res.json(bill);
  });
});

// ==================== EMPLOYEE ROUTES ====================

// ✅ Employee Login
app.post('/api/employee/login', (req, res) => {
  const { employeeId, password } = req.body;
  const query = 'SELECT * FROM employees WHERE employee_id = ? AND password = ?';
  
  db.query(query, [employeeId, password], (err, results) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    if (results.length === 0) {
      return res.status(401).json({ message: 'Invalid employee ID or password' });
    }
    res.json({ message: 'Login successful', employee: results[0] });
  });
});

// ✅ Update order status
app.put('/api/orders/:id/status', (req, res) => {
  const { status } = req.body;
  const orderId = req.params.id;
  
  const query = 'UPDATE orders SET status = ? WHERE id = ?';
  db.query(query, [status, orderId], (err, result) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Order not found' });
    }
    res.json({ message: 'Order status updated successfully', status });
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});

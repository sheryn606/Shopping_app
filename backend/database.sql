-- ==========================================
-- CUDDLECOT DATABASE - Kids Clothing Shop
-- ==========================================

-- Create Database
CREATE DATABASE IF NOT EXISTS cuddlecot_db;
USE cuddlecot_db;

-- ==========================================
-- TABLE: users
-- ==========================================
CREATE TABLE users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  email VARCHAR(100) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL,
  phone VARCHAR(15),
  address TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Sample Users Data
INSERT INTO users (name, email, password, phone, address) VALUES
('Rahul Sharma', 'rahul@example.com', 'password123', '9876543210', '123 MG Road, Bangalore'),
('Priya Singh', 'priya@example.com', 'password123', '9876543211', '456 Park Street, Delhi'),
('Amit Kumar', 'amit@example.com', 'password123', '9876543212', '789 Link Road, Mumbai'),
('Sneha Patel', 'sneha@example.com', 'password123', '9876543213', '321 Central Avenue, Pune'),
('Vikram Rao', 'vikram@example.com', 'password123', '9876543214', '654 Main Street, Hyderabad');

-- ==========================================
-- TABLE: products
-- ==========================================
CREATE TABLE products (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(150) NOT NULL,
  price DECIMAL(10, 2) NOT NULL,
  image VARCHAR(255),
  category VARCHAR(50) NOT NULL,
  description TEXT,
  age INT NOT NULL,
  stock_quantity INT DEFAULT 100,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Sample Products Data (Kids Clothing)
INSERT INTO products (name, price, image, category, description, age, stock_quantity) VALUES
('Soft Cotton Dress', 999.00, 'https://via.placeholder.com/300/FFB6C1/000000?text=Cotton+Dress', 'Girls', 'Comfortable and breathable cotton dress perfect for daily wear', 3, 50),
('Baby Hoodie', 799.00, 'https://via.placeholder.com/300/87CEEB/000000?text=Baby+Hoodie', 'Boys', 'Warm and cozy hoodie for winter season', 5, 45),
('Floral Frock', 1299.00, 'https://via.placeholder.com/300/FFD700/000000?text=Floral+Frock', 'Girls', 'Beautiful floral pattern frock for special occasions', 4, 30),
('Denim Jacket', 1499.00, 'https://via.placeholder.com/300/4682B4/000000?text=Denim+Jacket', 'Boys', 'Stylish denim jacket for casual outings', 6, 40),
('Princess Gown', 1899.00, 'https://via.placeholder.com/300/FF69B4/000000?text=Princess+Gown', 'Girls', 'Elegant princess gown for birthday parties', 5, 25),
('Sports T-Shirt', 599.00, 'https://via.placeholder.com/300/32CD32/000000?text=Sports+TShirt', 'Boys', 'Comfortable sports t-shirt for active kids', 7, 60),
('Tutu Skirt', 899.00, 'https://via.placeholder.com/300/FF1493/000000?text=Tutu+Skirt', 'Girls', 'Adorable tutu skirt for dance and play', 3, 55),
('Cargo Pants', 1099.00, 'https://via.placeholder.com/300/8B4513/000000?text=Cargo+Pants', 'Boys', 'Durable cargo pants with multiple pockets', 6, 35),
('Butterfly Dress', 1399.00, 'https://via.placeholder.com/300/9370DB/000000?text=Butterfly+Dress', 'Girls', 'Cute butterfly print dress for summer', 4, 42),
('Striped Polo', 749.00, 'https://via.placeholder.com/300/FF6347/000000?text=Striped+Polo', 'Boys', 'Classic striped polo shirt for smart casual look', 5, 48),
('Fairy Costume', 1699.00, 'https://via.placeholder.com/300/DDA0DD/000000?text=Fairy+Costume', 'Girls', 'Magical fairy costume for dress-up play', 3, 20),
('Superhero Cape', 599.00, 'https://via.placeholder.com/300/DC143C/000000?text=Superhero+Cape', 'Boys', 'Fun superhero cape for imaginative play', 4, 65),
('Unicorn Onesie', 1299.00, 'https://via.placeholder.com/300/FFC0CB/000000?text=Unicorn+Onesie', 'Girls', 'Cozy unicorn onesie for bedtime', 6, 38),
('Jogger Set', 1199.00, 'https://via.placeholder.com/300/708090/000000?text=Jogger+Set', 'Boys', 'Comfortable jogger set for sports activities', 7, 44),
('Bow Dress', 1099.00, 'https://via.placeholder.com/300/F08080/000000?text=Bow+Dress', 'Girls', 'Elegant dress with cute bow details', 5, 33);

-- ==========================================
-- TABLE: cart
-- ==========================================
CREATE TABLE cart (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT NOT NULL,
  product_id INT NOT NULL,
  quantity INT DEFAULT 1,
  added_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
  FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE CASCADE
);

-- Sample Cart Data (User 1 has items in cart)
INSERT INTO cart (user_id, product_id, quantity) VALUES
(1, 1, 2),
(1, 2, 1),
(1, 5, 1),
(2, 3, 1),
(2, 7, 2);

-- ==========================================
-- TABLE: orders
-- ==========================================
CREATE TABLE orders (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT NOT NULL,
  total_amount DECIMAL(10, 2) NOT NULL,
  status VARCHAR(50) DEFAULT 'Pending',
  order_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

-- Sample Orders Data
INSERT INTO orders (user_id, total_amount, status, order_date) VALUES
(1, 2997.00, 'Delivered', '2026-02-10 10:30:00'),
(2, 1299.00, 'Shipped', '2026-02-15 14:20:00'),
(3, 2298.00, 'Pending', '2026-02-18 09:15:00'),
(4, 1899.00, 'Delivered', '2026-02-12 16:45:00'),
(5, 3197.00, 'Processing', '2026-02-17 11:00:00');

-- ==========================================
-- TABLE: order_items
-- ==========================================
CREATE TABLE order_items (
  id INT AUTO_INCREMENT PRIMARY KEY,
  order_id INT NOT NULL,
  product_id INT NOT NULL,
  quantity INT NOT NULL,
  price DECIMAL(10, 2) NOT NULL,
  FOREIGN KEY (order_id) REFERENCES orders(id) ON DELETE CASCADE,
  FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE CASCADE
);

-- Sample Order Items Data
INSERT INTO order_items (order_id, product_id, quantity, price) VALUES
-- Order 1
(1, 1, 2, 999.00),
(1, 2, 1, 799.00),
-- Order 2
(2, 3, 1, 1299.00),
-- Order 3
(3, 4, 1, 1499.00),
(3, 6, 1, 599.00),
-- Order 4
(4, 5, 1, 1899.00),
-- Order 5
(5, 7, 2, 899.00),
(5, 9, 1, 1399.00);

-- ==========================================
-- DISPLAY ALL DATA
-- ==========================================
SELECT 'USERS TABLE' AS '';
SELECT * FROM users;

SELECT 'PRODUCTS TABLE' AS '';
SELECT * FROM products;

SELECT 'CART TABLE' AS '';
SELECT * FROM cart;

SELECT 'ORDERS TABLE' AS '';
SELECT * FROM orders;

SELECT 'ORDER ITEMS TABLE' AS '';
SELECT * FROM order_items;

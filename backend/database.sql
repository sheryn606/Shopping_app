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
INSERT INTO products (id, name, price, category, age, image, description, stock_quantity) VALUES
(201, 'Kids Traditional Ethnic Set', 1499, 'Boys', 4, 'https://images.jdmagicbox.com/quickquotes/images_main/-7l3tx6to.jpg', 'Traditional festive ethnic wear set for kids, ideal for functions and celebrations.', 20),
(202, 'Floral Printed Girls Dress', 1199, 'Girls', 5, 'https://m.media-amazon.com/images/I/81UfVn8JCCL._SX679_.jpg', 'Beautiful floral printed party dress for girls made from soft breathable fabric.', 18),
(203, 'Toddler Casual Outfit Set', 999, 'Boys', 3, 'https://i5.walmartimages.com/asr/26b33ce6-209a-458c-8576-993f772d3ebd.af1a03aaab6fb35ded23b5269f282b6d.jpeg', 'Comfortable daily wear outfit set for toddlers with premium cotton material.', 25),
(204, 'Cute Baby Frock', 899, 'Girls', 2, 'https://img.kwcdn.com/product/fancy/7c694c5e-9323-4213-85d0-b1f40ee43f9a.jpg', 'Adorable baby frock suitable for casual and special occasions.', 15),
(205, 'Girls Party Wear Dress', 1799, 'Girls', 6, 'https://www.babybooshop.in/cdn/shop/files/IMG-9824.jpg', 'Premium party wear dress with elegant design and soft inner lining.', 12),
(206, 'Designer Baby Dress', 1599, 'Girls', 4, 'https://www.babybooshop.in/cdn/shop/files/7A15A245-1BB6-4ED6-AF35-969B5E677C3A.jpg', 'Stylish designer baby dress perfect for birthdays and celebrations.', 10),
(207, 'Indigo Cotton Kurta Set', 1399, 'Boys', 5, 'https://cdn.shopify.com/s/files/1/0581/5064/9942/files/22BETHSET-505KURTCTN-SRIPRI-INDIG_20IO-1.jpg', 'Traditional indigo cotton kurta set for boys, soft and breathable.', 20),
(208, 'Girls Printed Dress', 899, 'Girls', 4, 'https://images.meesho.com/images/products/428474498/vxccm_512.webp', 'Trendy printed dress for girls with vibrant colors.', 22),
(209, 'Baby Festive Outfit', 1299, 'Boys', 3, 'https://babynmeindia.com/cdn/shop/files/WhatsAppImage2025-11-12at1.14.02PM_1_huhu.png', 'Festive baby outfit designed for comfort and style.', 15),
(210, 'Gentleman Romper Set', 1099, 'Boys', 2, 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRxnw7Pn8oFsmwaqwo9o_1AlvJDS0HGiiPb0A&s', 'Cute gentleman style romper with bow tie for baby boys.', 30),
(211, 'Girls Princess Dress', 1899, 'Girls', 5, 'https://m.media-amazon.com/images/I/81zkafrPf7L._AC_UY1100_.jpg', 'Princess themed party dress with soft net layering.', 8),
(212, 'Elephant Printed Dress', 999, 'Girls', 4, 'https://lillebarn.in/cdn/shop/products/Elephanta.jpg', 'Elephant print cotton dress for daily comfort wear.', 18),
(213, 'Newborn Baby Socks', 299, 'Others', 1, 'https://d29azk3rh443yy.cloudfront.net/static/Products/NEOSOFT-Socks-For-NewBorn-Baby-surginatal.com-005.webp', 'Soft and stretchable newborn baby socks pack.', 40),
(214, 'Luxury Baby Sock Set', 799, 'Others', 1, 'https://www.kashwere.com/cdn/shop/files/malt-creme-sock-set-bbch-bsx01-262-onsz_640x@2x.jpg', 'Premium cozy sock set for babies.', 20),
(215, 'Kids Casual Top', 699, 'Boys', 4, 'https://www.vishalmegamart.com/dw/image/v2/BGHT_PRD/on/demandware.static/-/Sites-vmm-apparel-master-catalog/default/dw3e6197d0/images/large/1134072109001_1.jpg', 'Casual everyday top for kids made from breathable fabric.', 25),
(216, 'Cute Baby Shoes', 599, 'Others', 2, 'https://www.crazytoes.in/cdn/shop/files/H328f1aace78f45b297d8875b3789f3245.webp', 'Soft sole baby shoes designed for comfort and safety.', 30),
(217, 'Baby Care Gift Set', 1499, 'Others', 1, 'https://www.babyforest.in/cdn/shop/files/2_aa21d462-e467-410f-bb7c-fa646105e131_300x300.jpg', 'Premium baby care essentials gift set.', 10),
(218, 'Girls Elegant Party Gown', 1999, 'Girls', 6, 'https://m.media-amazon.com/images/I/81cNRkZ9fIL._AC_UY1100_.jpg', 'Elegant full-length party gown for special occasions.', 7),
(219, 'Frill Denim Dress', 1199, 'Girls', 5, 'https://miarcus.com/cdn/shop/files/girls-frill-denim-dress-8904351934880-234314.webp', 'Stylish frill denim dress for girls.', 14),
(220, 'Kids Formal Shirt', 899, 'Boys', 5, 'https://xcdn.next.co.uk/Common/Items/Default/Default/ItemImages/3_4Ratio/Search/Lge/H52474.jpg', 'Smart formal shirt perfect for events and school functions.', 16),
(221, 'Casual Printed Frock', 799, 'Girls', 3, 'https://images.meesho.com/images/products/381614372/qrng9_512.webp', 'Comfortable printed frock for daily wear.', 19),
(222, 'Baby Cotton Romper', 699, 'Boys', 1, 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQrW-pB0IevBmfA1AOJCK8zZkAkdIDGoDaydQ&s', 'Soft cotton romper for newborn babies.', 35);

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
(1, 202, 2),
(1, 210, 1),
(1, 211, 1),
(2, 205, 1),
(2, 208, 2),
(3, 207, 1),
(3, 215, 1),
(4, 213, 3),
(4, 216, 2),
(5, 218, 1);

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
(1, 4597.00, 'Delivered', '2026-02-10 10:30:00'),
(2, 3597.00, 'Shipped', '2026-02-15 14:20:00'),
(3, 2098.00, 'Pending', '2026-02-18 09:15:00'),
(4, 2096.00, 'Delivered', '2026-02-12 16:45:00'),
(5, 5396.00, 'Processing', '2026-02-17 11:00:00'),
(1, 2098.00, 'Delivered', '2026-02-08 15:20:00'),
(3, 1999.00, 'Shipped', '2026-02-19 12:30:00');

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
-- Order 1 (User 1 - ₹4597)
(1, 202, 2, 1199.00),
(1, 210, 1, 1099.00),
(1, 210, 1, 1099.00),
-- Order 2 (User 2 - ₹3597)
(2, 205, 1, 1799.00),
(2, 208, 2, 899.00),
-- Order 3 (User 3 - ₹2098)
(3, 207, 1, 1399.00),
(3, 215, 1, 699.00),
-- Order 4 (User 4 - ₹2096)
(4, 213, 4, 299.00),
(4, 216, 2, 599.00),
-- Order 5 (User 5 - ₹5396)
(5, 218, 1, 1999.00),
(5, 211, 1, 1899.00),
(5, 201, 1, 1499.00),
-- Order 6 (User 1 - ₹2098)
(6, 207, 1, 1399.00),
(6, 215, 1, 699.00),
-- Order 7 (User 3 - ₹1999)
(7, 218, 1, 1999.00);

-- ==========================================
-- TABLE: employees
-- ==========================================
CREATE TABLE employees (
  id INT AUTO_INCREMENT PRIMARY KEY,
  employee_id VARCHAR(50) UNIQUE NOT NULL,
  name VARCHAR(100) NOT NULL,
  password VARCHAR(255) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Sample Employees Data
INSERT INTO employees (employee_id, name, password) VALUES
('EMP001', 'Admin Kumar', 'emp123'),
('EMP002', 'Manager Singh', 'emp123'),
('EMP003', 'Staff Patel', 'emp123');

-- ==========================================
-- TABLE: bills
-- ==========================================
CREATE TABLE bills (
  id INT AUTO_INCREMENT PRIMARY KEY,
  order_id INT NOT NULL,
  user_id INT NOT NULL,
  customer_name VARCHAR(100) NOT NULL,
  subtotal DECIMAL(10, 2) NOT NULL,
  tax DECIMAL(10, 2) NOT NULL,
  total DECIMAL(10, 2) NOT NULL,
  payment_status VARCHAR(50) DEFAULT 'Paid',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (order_id) REFERENCES orders(id) ON DELETE CASCADE,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

-- ==========================================
-- TABLE: bill_items
-- ==========================================
CREATE TABLE bill_items (
  id INT AUTO_INCREMENT PRIMARY KEY,
  bill_id INT NOT NULL,
  product_name VARCHAR(150) NOT NULL,
  quantity INT NOT NULL,
  price DECIMAL(10, 2) NOT NULL,
  subtotal DECIMAL(10, 2) NOT NULL,
  FOREIGN KEY (bill_id) REFERENCES bills(id) ON DELETE CASCADE
);

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

SELECT 'EMPLOYEES TABLE' AS '';
SELECT * FROM employees;

SELECT 'BILLS TABLE' AS '';
SELECT * FROM bills;

SELECT 'BILL ITEMS TABLE' AS '';
SELECT * FROM bill_items;

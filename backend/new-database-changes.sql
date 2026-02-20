-- ==========================================
-- NEW DATABASE CHANGES FOR FEATURES
-- Run these SQL statements to add new features
-- ==========================================

USE cuddlecot_db;

-- ==========================================
-- TABLE: employees
-- ==========================================
CREATE TABLE IF NOT EXISTS employees (
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
-- TABLE: bills (for bill generation)
-- ==========================================
CREATE TABLE IF NOT EXISTS bills (
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
CREATE TABLE IF NOT EXISTS bill_items (
  id INT AUTO_INCREMENT PRIMARY KEY,
  bill_id INT NOT NULL,
  product_name VARCHAR(150) NOT NULL,
  quantity INT NOT NULL,
  price DECIMAL(10, 2) NOT NULL,
  subtotal DECIMAL(10, 2) NOT NULL,
  FOREIGN KEY (bill_id) REFERENCES bills(id) ON DELETE CASCADE
);

-- ==========================================
-- VERIFY ALL TABLES
-- ==========================================
SELECT 'EMPLOYEES TABLE' AS '';
SELECT * FROM employees;

SELECT 'BILLS TABLE' AS '';
SELECT * FROM bills;

SELECT 'BILL ITEMS TABLE' AS '';
SELECT * FROM bill_items;

-- ==========================================
-- SUMMARY
-- ==========================================
-- Tables Added:
-- 1. employees - for employee login and management
-- 2. bills - for storing bill information after order
-- 3. bill_items - for storing individual bill items

-- NOTE: The 'status' column already exists in the orders table
-- with default value 'Pending', so no modification needed there.

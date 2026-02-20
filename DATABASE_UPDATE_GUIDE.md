# 🗄️ DATABASE UPDATE QUICK REFERENCE

## Step 1: Run SQL Updates

Execute this in your MySQL terminal:

```bash
mysql -u root -p
```

Enter password: `root@123` (or your MySQL password)

Then run:

```sql
USE cuddlecot_db;

-- Create employees table
CREATE TABLE employees (
  id INT AUTO_INCREMENT PRIMARY KEY,
  employee_id VARCHAR(50) UNIQUE NOT NULL,
  name VARCHAR(100) NOT NULL,
  password VARCHAR(255) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Insert sample employees
INSERT INTO employees (employee_id, name, password) VALUES
('EMP001', 'Admin Kumar', 'emp123'),
('EMP002', 'Manager Singh', 'emp123'),
('EMP003', 'Staff Patel', 'emp123');

-- Create bills table
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

-- Create bill_items table
CREATE TABLE bill_items (
  id INT AUTO_INCREMENT PRIMARY KEY,
  bill_id INT NOT NULL,
  product_name VARCHAR(150) NOT NULL,
  quantity INT NOT NULL,
  price DECIMAL(10, 2) NOT NULL,
  subtotal DECIMAL(10, 2) NOT NULL,
  FOREIGN KEY (bill_id) REFERENCES bills(id) ON DELETE CASCADE
);

-- Verify tables created
SHOW TABLES;
SELECT * FROM employees;
```

## Step 2: Verify Tables

```sql
-- Check employees
SELECT * FROM employees;

-- Check if bills table exists
DESCRIBE bills;

-- Check if bill_items table exists
DESCRIBE bill_items;

-- Check orders table still has status column
DESCRIBE orders;
```

## Expected Output

You should see:
- ✅ 3 employees (EMP001, EMP002, EMP003)
- ✅ bills table with 8 columns
- ✅ bill_items table with 5 columns
- ✅ orders table still has status column (no changes needed)

## Test Login Credentials

### Customer Login
- Email: `rahul@example.com`
- Password: `password123`

### Employee Login
- Employee ID: `EMP001`
- Password: `emp123`

OR

- Employee ID: `EMP002`
- Password: `emp123`

OR

- Employee ID: `EMP003`
- Password: `emp123`

## Database Schema Summary

```
cuddlecot_db
├── users (existing - unchanged)
├── products (existing - unchanged)
├── cart (existing - unchanged)
├── orders (existing - unchanged, already has status column)
├── order_items (existing - unchanged)
├── employees (NEW)
├── bills (NEW)
└── bill_items (NEW)
```

## If You Get Errors

### "Table already exists"
```sql
DROP TABLE IF EXISTS bill_items;
DROP TABLE IF EXISTS bills;
DROP TABLE IF EXISTS employees;
-- Then re-run CREATE TABLE statements
```

### "Foreign key constraint fails"
Make sure you create tables in this order:
1. employees
2. bills (references orders and users)
3. bill_items (references bills)

### "Cannot add foreign key"
Ensure orders and users tables exist:
```sql
SHOW TABLES LIKE 'orders';
SHOW TABLES LIKE 'users';
```

## Quick Test After Database Update

```sql
-- Test employees table
SELECT COUNT(*) FROM employees;  -- Should return 3

-- Test orders still have status
SELECT id, status FROM orders LIMIT 5;

-- Bills should be empty initially
SELECT COUNT(*) FROM bills;  -- Should return 0
```

Done! Database is ready for the new features. 🎉

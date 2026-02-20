# Cuddlecot Backend API

Simple Node.js + Express + MySQL backend for the Cuddlecot Shopping App.

## Setup Instructions

### 1. Install Dependencies
```bash
cd backend
npm install
```

### 2. Setup MySQL Database
```bash
# Login to MySQL
mysql -u root -p

# Enter password: root@123

# Run the SQL file
source database.sql
# OR
mysql -u root -p < database.sql
```

### 3. Start the Server
```bash
npm start
```

Server will run on: **http://localhost:3000**

## API Endpoints

### Products
- `GET /api/products` - Get all products
- `GET /api/products/:id` - Get product by ID

### Authentication
- `POST /api/login` - User login
  ```json
  { "email": "rahul@example.com", "password": "password123" }
  ```

### Cart
- `GET /api/cart/:userId` - Get user's cart
- `POST /api/cart` - Add item to cart
  ```json
  { "userId": 1, "productId": 1, "quantity": 1 }
  ```
- `PUT /api/cart/:id` - Update cart item quantity
- `DELETE /api/cart/:id` - Remove cart item

### Orders
- `POST /api/orders` - Create new order
- `GET /api/orders/:userId` - Get user's order history

## Database Info
- **Database:** cuddlecot_db
- **Host:** localhost
- **User:** root
- **Password:** root@123

## Test Credentials
- **Email:** rahul@example.com
- **Password:** password123

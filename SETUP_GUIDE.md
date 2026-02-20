# 🚀 Cuddlecot Shopping App - Complete Setup Guide

## 📋 Prerequisites
- Node.js (v18 or higher)
- MySQL Server (v8.0 or higher)
- Angular CLI (v18 or higher)

---

## 🔧 STEP 1: BACKEND SETUP

### 1.1 Navigate to Backend Directory
```bash
cd /home/umeshwar/Downloads/Shopping_app/backend
```

### 1.2 Install Backend Dependencies
```bash
npm install express mysql2 cors
```

### 1.3 Install Nodemon (Optional - for development)
```bash
npm install --save-dev nodemon
```

---

## 🗄️ STEP 2: DATABASE SETUP

### 2.1 Start MySQL Server
```bash
sudo systemctl start mysql
# OR
sudo service mysql start
```

### 2.2 Login to MySQL
```bash
mysql -u root -p
```
**Enter password:** `root@123`

### 2.3 Run the SQL File

#### Option A: From MySQL Prompt
```sql
source /home/umeshwar/Downloads/Shopping_app/backend/database.sql
```

#### Option B: From Terminal
```bash
mysql -u root -p < /home/umeshwar/Downloads/Shopping_app/backend/database.sql
```

### 2.4 Verify Database Creation
```sql
USE cuddlecot_db;
SHOW TABLES;
SELECT COUNT(*) FROM products;
SELECT COUNT(*) FROM users;
```

You should see:
- 5 tables: users, products, cart, orders, order_items
- 5 users
- 15 products

---

## ⚡ STEP 3: START BACKEND SERVER

### 3.1 Navigate to Backend Directory
```bash
cd /home/umeshwar/Downloads/Shopping_app/backend
```

### 3.2 Start the Server
```bash
npm start
# OR for development with auto-reload:
npm run dev
```

**Expected Output:**
```
✅ Connected to MySQL database: cuddlecot_db
🚀 Server running on http://localhost:3000
```

Keep this terminal running!

---

## 🎨 STEP 4: FRONTEND SETUP

### 4.1 Open New Terminal & Navigate to Project Root
```bash
cd /home/umeshwar/Downloads/Shopping_app
```

### 4.2 Install Angular Material
```bash
ng add @angular/material
```

**When prompted:**
- Choose theme: **Indigo/Pink** (or any preferred theme)
- Set up global typography: **Yes**
- Include animations: **Yes**

### 4.3 Install Frontend Dependencies (if needed)
```bash
npm install
```

---

## 🚀 STEP 5: START ANGULAR APP

### 5.1 Start the Development Server
```bash
ng serve
# OR to open browser automatically:
ng serve --open
```

**Expected Output:**
```
✔ Browser application bundle generation complete.
✔ Development server is listening on http://localhost:4200/
```

---

## 🌐 STEP 6: ACCESS THE APPLICATION

### Open your browser and go to:
```
http://localhost:4200
```

### Test Login Credentials:
- **Email:** `rahul@example.com`
- **Password:** `password123`

### Other Test Users:
1. priya@example.com / password123
2. amit@example.com / password123
3. sneha@example.com / password123
4. vikram@example.com / password123

---

## 📝 COMPLETE COMMAND SUMMARY

### Terminal 1 (Backend Server):
```bash
cd /home/umeshwar/Downloads/Shopping_app/backend
npm install express mysql2 cors
npm start
```

### Terminal 2 (MySQL - One Time Setup):
```bash
mysql -u root -p < /home/umeshwar/Downloads/Shopping_app/backend/database.sql
```

### Terminal 3 (Frontend):
```bash
cd /home/umeshwar/Downloads/Shopping_app
ng add @angular/material
ng serve
```

---

## 🎯 API ENDPOINTS (Backend)

### Products
- `GET http://localhost:3000/api/products` - Get all products
- `GET http://localhost:3000/api/products/:id` - Get single product

### Authentication
- `POST http://localhost:3000/api/login` - User login
  ```json
  {
    "email": "rahul@example.com",
    "password": "password123"
  }
  ```

### Cart
- `GET http://localhost:3000/api/cart/:userId` - Get user's cart
- `POST http://localhost:3000/api/cart` - Add to cart
- `PUT http://localhost:3000/api/cart/:id` - Update quantity
- `DELETE http://localhost:3000/api/cart/:id` - Remove item

### Orders
- `POST http://localhost:3000/api/orders` - Create order
- `GET http://localhost:3000/api/orders/:userId` - Get order history

---

## 🎨 FEATURES IMPLEMENTED

### Frontend:
✅ Angular Material UI with modern design
✅ Responsive layout
✅ Loading spinners
✅ Error handling with snackbar notifications
✅ Professional color scheme (Purple gradient)
✅ Hover effects and animations
✅ Clean typography
✅ Cart badge with item count
✅ User authentication
✅ Product filtering (Category, Age, Price)

### Backend:
✅ RESTful API with Express
✅ MySQL database integration
✅ CORS enabled
✅ User authentication
✅ Cart management
✅ Order processing

---

## 🐛 Troubleshooting

### Port Already in Use (3000 or 4200)
```bash
# Find and kill process on port 3000
sudo lsof -t -i:3000 | xargs kill -9

# Find and kill process on port 4200
sudo lsof -t -i:4200 | xargs kill -9
```

### MySQL Connection Error
1. Check MySQL is running: `sudo systemctl status mysql`
2. Verify password in `backend/db.js` matches your MySQL root password
3. Ensure database exists: `SHOW DATABASES;`

### Angular Material Not Found
```bash
ng add @angular/material --skip-confirmation
```

### CORS Error
- Ensure backend server is running on port 3000
- Check `environment.ts` has correct API URL: `http://localhost:3000/api`

---

## 📱 Testing the App

1. **Login Page** → Use test credentials
2. **Home Page** → View featured categories
3. **Products Page** → Browse all products, apply filters
4. **Add to Cart** → Click "Add to Cart" on any product
5. **Cart Page** → View cart, modify quantities
6. **Checkout** → Review order and place it
7. **About Page** → Learn about the app

---

## 🎉 Success Indicators

✅ Backend console shows: "Server running on http://localhost:3000"
✅ Database has 15 products and 5 users
✅ Angular app opens on http://localhost:4200
✅ Login works and redirects to home
✅ Products load from database
✅ Can add items to cart
✅ Cart badge updates
✅ Can place orders

---

## 📦 Technology Stack

**Frontend:**
- Angular 18
- Angular Material
- TypeScript
- RxJS
- CSS3

**Backend:**
- Node.js
- Express.js
- MySQL2
- CORS

**Database:**
- MySQL 8.0

---

## 👨‍💻 Development Notes

- Backend runs on: `http://localhost:3000`
- Frontend runs on: `http://localhost:4200`
- Database name: `cuddlecot_db`
- All passwords in test data: `password123`

---

## 🎨 Color Scheme

- Primary: `#667eea` (Purple Blue)
- Secondary: `#764ba2` (Deep Purple)
- Accent: Gradient from primary to secondary
- Background: `#f5f7fa` (Light Gray)
- Text: `#333` (Dark Gray)

---

**Happy Coding! 🚀✨**

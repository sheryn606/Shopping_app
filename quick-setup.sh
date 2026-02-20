#!/bin/bash

# Cuddlecot - Quick Setup Script
echo "🧸 Cuddlecot Shopping App - Quick Setup"
echo "========================================"
echo ""

# Backend Setup
echo "📦 Step 1: Installing Backend Dependencies..."
cd backend
npm install express mysql2 cors
npm install --save-dev nodemon
cd ..
echo "✅ Backend dependencies installed!"
echo ""

# Frontend Setup
echo "📦 Step 2: Installing Angular Material..."
ng add @angular/material --skip-confirmation
echo "✅ Angular Material installed!"
echo ""

echo "🎉 Setup Complete!"
echo ""
echo "Next Steps:"
echo "1. Setup MySQL database:"
echo "   mysql -u root -p < backend/database.sql"
echo ""
echo "2. Start Backend (Terminal 1):"
echo "   cd backend && npm start"
echo ""
echo "3. Start Frontend (Terminal 2):"
echo "   ng serve"
echo ""
echo "4. Open browser:"
echo "   http://localhost:4200"
echo ""
echo "Login with: rahul@example.com / password123"

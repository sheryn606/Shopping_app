import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { ProductsComponent } from './components/products/products.component';
import { CartComponent } from './components/cart/cart.component';
import { CheckoutComponent } from './components/checkout/checkout.component';
import { AboutComponent } from './components/about/about.component';
import { LoginComponent } from './login/login.component';
import { EmployeeLoginComponent } from './employee/employee-login/employee-login.component';
import { EmployeeDashboardComponent } from './employee/employee-dashboard/employee-dashboard.component';
import { employeeGuard } from './guards/employee.guard';


export const routes: Routes = [

  // ==================== CUSTOMER ROUTES ====================
  
  // Default Route
  { path: '', redirectTo: 'login', pathMatch: 'full' },

  // Customer Login
  { path: 'login', component: LoginComponent, title: 'Cuddlecot - Customer Login' },

  // Main Customer Pages
  { path: 'home', component: HomeComponent, title: 'Cuddlecot - Home' },
  { path: 'products', component: ProductsComponent, title: 'Cuddlecot - Products' },
  { path: 'cart', component: CartComponent, title: 'Cuddlecot - Cart' },
  { path: 'checkout', component: CheckoutComponent, title: 'Cuddlecot - Checkout' },
  { path: 'about', component: AboutComponent, title: 'Cuddlecot - About Us' },

  // ==================== EMPLOYEE ROUTES ====================
  
  // Employee Login (No Guard)
  { path: 'employee/login', component: EmployeeLoginComponent, title: 'Employee Portal - Login' },
  
  // Employee Dashboard (Protected by Guard)
  { 
    path: 'employee/dashboard', 
    component: EmployeeDashboardComponent, 
    canActivate: [employeeGuard],
    title: 'Employee Portal - Dashboard' 
  },

  // Wildcard Route (404 handling)
  { path: '**', redirectTo: 'login' }

];

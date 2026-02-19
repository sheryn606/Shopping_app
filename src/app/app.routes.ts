import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { ProductsComponent } from './components/products/products.component';
import { CartComponent } from './components/cart/cart.component';
import { CheckoutComponent } from './components/checkout/checkout.component';
import { AboutComponent } from './components/about/about.component';
import { LoginComponent } from './login/login.component';


export const routes: Routes = [


  // Default Route
  { path: '', redirectTo: 'login', pathMatch: 'full' },

  // Main Pages
  { path: 'home', component: HomeComponent, title: 'Cuddlecot - Home' },
  { path: 'products', component: ProductsComponent, title: 'Cuddlecot - Products' },
  { path: 'cart', component: CartComponent, title: 'Cuddlecot - Cart' },
  { path: 'checkout', component: CheckoutComponent, title: 'Cuddlecot - Checkout' },
  { path: 'about', component: AboutComponent, title: 'Cuddlecot - About Us' },
{path: 'login',component:LoginComponent},
  // Wildcard Route (404 handling)
  { path: '**', redirectTo: 'home' }

];
